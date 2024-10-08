import { useQuery, useQueryClient } from "@tanstack/react-query";
import hash from "object-hash";
import { http } from "./http";

export const queryKeys = {
  users: "users",
  isAuthenticated: "isAuthenticated",
  organizationsByOrganizer: "organizationsByOrganizer",
  eventsByOrganization: "eventsByOrganization",
  allOrganizations: "allOrganizations",
  organizerFavoritesIds: "organizerFavoritesIds",
  buyerFavoritesIds: "buyerFavoritesIds",
  organizerFavorites: "organizerFavorites",
  buyerFavorites: "buyerFavorites",
  eventByEventId: "eventByEventId",
  liveEvents: "liveEvents",
  organizationById: "organizationById",
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

export function useGetFavoritesForBuyerIdsOnly() {
  return useQuery({
    queryKey: [queryKeys.buyerFavoritesIds],
    queryFn: async () => {
      return http.getBuyersFavoritesIds();
    },
    staleTime: 0,
  });
}

export function useGetFavoritesForBuyer() {
  return useQuery({
    queryKey: [queryKeys.buyerFavorites],
    queryFn: async () => {
      return http.getBuyersFavorites();
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

export function useGetOrganizationById(organizationId: number) {
  return useQuery({
    queryKey: [queryKeys.organizationById, organizationId],
    queryFn: async () => {
      return http.getOrganizationById(organizationId);
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

//Buyer queries

export function useGetLiveEvents() {
  return useQuery({
    queryKey: [queryKeys.liveEvents],
    queryFn: async () => {
      return http.getLiveEvents();
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
