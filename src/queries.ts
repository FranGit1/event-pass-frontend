import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import hash from "object-hash";
import { http } from "./http";
import { useSetRecoilState } from "recoil";
import { adminSelectedEventIdAtom } from "./recoil/atoms/adminSelectedEventIdAtom";

export const queryKeys = {
  users: "users",
  isAuthenticated: "isAuthenticated",
  organizationsByOrganizer: "organizationsByOrganizer",
  eventsByOrganization: "eventsByOrganization",
  allOrganizations: "allOrganizations",
  organizerFavoritesIds: "organizerFavoritesIds",
  organizerFavorites: "organizerFavorites",
  eventByEventId: "eventByEventId",
};

export const useIsAuthenticated = () => {
  return useQuery<any, any>({
    queryKey: [queryKeys.isAuthenticated],
    queryFn: () => http.isAuthenticated(),
  });
};

export const useGetComplexBuildingsAndUnitTypes = () => {
  return useQuery({
    queryKey: [queryKeys.organizationsByOrganizer],
    queryFn: async () => {
      return http.getComplexBuildingsAndUnitTypes();
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
export const useGetAllOrganizations = () => {
  return useQuery({
    queryKey: [queryKeys.allOrganizations],
    queryFn: async () => {
      return http.getAllOrganizations();
    },
    staleTime: 0,
  });
};
export function useGetFavoritesForOrganizerIdsOnly() {
  return useQuery({
    queryKey: [queryKeys.organizerFavoritesIds],
    queryFn: async () => {
      return http.getOrganizerFavoritesIds();
    },
    staleTime: 0,
  });
}

export function useGetEventByEventId(eventId: number) {
  return useQuery({
    queryKey: [queryKeys.eventByEventId, eventId],
    queryFn: async () => {
      const response = await http.getEventByEventId(eventId);
      return response;
    },

    staleTime: 0,
  });
}

export function useGetFavoritesForOrganizer() {
  return useQuery({
    queryKey: [queryKeys.organizerFavorites],
    queryFn: async () => {
      return http.getOrganizersFavorites();
    },
    staleTime: 0,
  });
}

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
