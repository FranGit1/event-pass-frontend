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
  organizationsByOrganizer: "organizationsByOrganizer",
  eventsByOrganization: "eventsByOrganization",
};

export const useIsAuthenticated = () => {
  return useQuery<any, any>({
    queryKey: [queryKeys.isAuthenticated],
    queryFn: () => http.isAuthenticated(),
  });
};

export const useGetComplexBuildingsAndUnitTypes = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.organizationsByOrganizer, id],
    queryFn: async () => {
      return http.getComplexBuildingsAndUnitTypes(id);
    },
    staleTime: 0,
  });
};
export const useGetOrganizationEvents = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.eventsByOrganization, id],
    queryFn: async () => {
      return http.getEventsByOrganization(id);
    },
    staleTime: 0,
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
