import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import hash from "object-hash";
import { http } from "./http";

export const queryKeys = {
  users: "users",
  isAuthenticated: "isAuthenticated",
};

export const useIsAuthenticated = () => {
  return useQuery<any, any>({
    queryKey: [queryKeys.isAuthenticated],
    queryFn: () => http.isAuthenticated(),
  });
};

const useLazyQuery = <T>(
  queryKey: any,
  queryFn: any
): ((params?: any) => Promise<T>) => {
  const client = useQueryClient();
  return (params?: any) => {
    return client.fetchQuery({
      queryKey: [queryKey, hash(params)],
      queryFn: () => queryFn(params),
    });
  };
};
