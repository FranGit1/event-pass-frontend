import 'twin.macro';

import { Column, useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';
import { IComponentBaseProps, Maybe } from '../../../../types';
import { ReactNode, useEffect } from 'react';

import { AsyncDataTableBody } from './AsyncDataTableBody';
import { AsyncDataTableHeader } from './AsyncDataTableHeader';
import { AsyncDataTableLoader } from './AsyncDataTableLoader';
import { AsyncDataTablePagination } from './AsyncDataTablePagination';
import { Freeze } from '../../../../components/Freeze';
import { Typography } from '../../../Typography';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { useSticky } from 'react-table-sticky';

const customTableContainerStyle = css``;
export type ICustomColumnProps<T extends object> = Omit<Column<T>, 'Cell'> & {
  cell(data: T): ReactNode;
  accessor: keyof T;
  align?: 'left' | 'right' | 'center';
  disableSortBy?: boolean;
  sticky?: 'left' | 'right';
};

interface IAsyncDataTableProps<T extends object> extends IComponentBaseProps {
  columns: ICustomColumnProps<T>[];
  data: T[];
  totalCount: number;
  maxPage: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  sortKey?: keyof T;
  activeRowIndex?: Maybe<number>;
  setPage(value: number): void;
  onRowClick?: (t: T, index: number) => void;
  sortOrder?: 'ASC' | 'DESC';
  setSortKey: (value: keyof T) => void;
  setSortOrder: (value: 'ASC' | 'DESC') => void;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
  showExpandButton: boolean;
  showTable: boolean;
}

export const AsyncDataTable = <T extends object>(props: IAsyncDataTableProps<T>) => {
  const {
    columns,
    totalCount,
    data,
    currentPage,
    setPage,
    pageSize,
    maxPage,
    loading,
    sortKey,
    sortOrder,
    setSortKey,
    setShowTable,
    showTable,
    showExpandButton
  } = props;

  const table = useTable(
    {
      columns: columns as Column[],
      data: !props.loading ? data : new Array(pageSize).fill({}),
      manualPagination: true,
      initialState: {
        // @ts-ignore
        pageIndex: currentPage - 1,
        pageSize
      },
      pageCount: maxPage,
      manualSortBy: true,
      disableMultiSort: true
    },
    useSortBy,
    useSticky,
    useFlexLayout,
    usePagination
  );

  useEffect(() => {
    table.gotoPage(currentPage - 1);
  }, [table, currentPage]);

  const showEmptyState = !props.loading && props.totalCount === 0;
  return (
    <div css={[props.containerCss]}>
      <div
        tw="relative -mr-4 sm:-mr-6 md:-mr-0 "
        css={[customTableContainerStyle, showEmptyState ? tw`overflow-x-hidden` : tw`overflow-x-hidden`]}
      >
        {showEmptyState && (
          <div tw="absolute  left-0 right-0 z-50 ">
            <div tw="flex items-center flex-col my-8">
              <Typography.H3 tw="text-black mb-6">No results</Typography.H3>
              <Typography.Body tw="text-black">Try adjusting your search</Typography.Body>
            </div>
          </div>
        )}
        <table {...table.getTableProps()} css={tw` w-full mb-8`} className="table sticky">
          <AsyncDataTableHeader
            tableInstance={table}
            sortKey={sortKey}
            sortOrder={sortOrder}
            setSortKey={setSortKey as any}
          />
          {props.loading ? (
            <AsyncDataTableLoader tableInstance={table} />
          ) : props.totalCount !== 0 ? (
            <AsyncDataTableBody
              tableInstance={table}
              onRowClick={props.onRowClick}
              activeRowIndex={props.activeRowIndex}
            />
          ) : (
            <>
              <tbody css={[tw`block h-96 `]} />
            </>
          )}
        </table>
      </div>
      <Freeze value={loading}>
        <AsyncDataTablePagination
          // @ts-ignore
          showExpandButton={showExpandButton}
          setShowTable={setShowTable}
          canPreviousPage={table.canPreviousPage}
          // @ts-ignore
          canNextPage={table.canNextPage}
          totalOnPage={data.length}
          totalCount={totalCount}
          pageSize={pageSize}
          maxPage={props.maxPage}
          currentPage={currentPage}
          setCurrentPage={setPage}
          showTable={props.showTable}
        />
      </Freeze>
    </div>
  );
};
