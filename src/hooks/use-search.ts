import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import invariant from "invariant";

type IFiltersParams<T> = T & {
  term: string;
};
export interface ISearchParams<F, O> {
  filters: IFiltersParams<F>;
  size: number;
  page: number;
  order: "ASC" | "DESC";
  orderField: O;
}

type DispatchSearchParams<K extends ISearchParams<any, any>> = {
  setPage: Dispatch<SetStateAction<K["page"]>>;
  setOrderField: Dispatch<SetStateAction<K["orderField"]>>;
  setOrder: Dispatch<SetStateAction<K["order"]>>;
  setFilters: Dispatch<SetStateAction<K["filters"]>>;
  setFilter(key: keyof K["filters"], value: any): void;
  setSize: Dispatch<SetStateAction<K["size"]>>;
  clearFilters: () => void;
};
export const useSearch = <F, O>(
  initial: Partial<ISearchParams<F, O>>
): [ISearchParams<F, O>, DispatchSearchParams<ISearchParams<F, O>>] => {
  invariant(initial.orderField, "useSearch needs initial orderField to work");

  const initialSearchParams: ISearchParams<F, O> = useMemo(
    () => ({
      page: initial?.page ?? 1,
      order: initial?.order ?? "ASC",
      filters: initial.filters ?? ({ term: "" } as IFiltersParams<F>),
      size: initial.size ?? 10,
      orderField: initial.orderField!,
    }),
    [initial]
  );

  const [page, setPage] = useState(initialSearchParams.page);
  const [orderField, setOrderField] = useState<O>(
    initialSearchParams.orderField
  );
  const [order, setOrder] = useState<"ASC" | "DESC">(initialSearchParams.order);
  const [filters, setFilters] = useState<IFiltersParams<F>>(
    initialSearchParams.filters
  );
  const [size, setSize] = useState<number>(initialSearchParams.size);
  return [
    {
      order,
      orderField,
      page,
      size,
      filters,
    },
    {
      setPage,
      setSize,
      setOrderField: useCallback(
        (value) => {
          setOrderField(value);
          setOrder(
            value === orderField ? (order === "DESC" ? "ASC" : "DESC") : order
          );
          setPage(1);
        },
        [setOrder, setPage, setOrderField, order, orderField]
      ),
      setOrder: useCallback(
        (value) => {
          setOrder(value);
          setPage(1);
        },
        [setOrder, setPage]
      ),
      setFilters: useCallback(
        (value) => {
          setFilters(value);
          setPage(1);
        },
        [setFilters, setPage]
      ),
      setFilter: useCallback(
        (key, value) => {
          setFilters({
            ...filters,
            [key]: value,
          });
          setPage(1);
        },
        [setFilters, setPage, filters]
      ),
      clearFilters: useCallback(() => {
        setFilters(initialSearchParams.filters);
        setPage(1);
      }, [setFilters, setPage, initialSearchParams]),
    },
  ];
};
