import axios from "axios";
import { config } from "./config";
import {
  CreateEventDto,
  EventResDto,
  FetchedEventData,
  FetchedEventDataBuyer,
  LoginForm,
  Organization,
  OrganizationsForSearch,
  RegisterForm,
} from "./types";

const axiosPublic = axios.create({
  baseURL: `${config.VITE_APP_BACKEND_URL}/api`,
  withCredentials: true,
});

const axiosAuthenticated = axios.create({
  baseURL: `${config.VITE_APP_BACKEND_URL}/api`,
  withCredentials: true,
});

axiosAuthenticated.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;

  return config;
});

class HTTP {
  // TODO
  isAuthenticated = async () => {
    // const response = await axiosAuthenticated.get('/isAuthenticated')
    // return response.data
    // return localStorage.getItem('token')
    return true;
  };

  login = async (credentials: LoginForm) => {
    const response = await axiosPublic.post("/auth/login", credentials);
    const accessToken = response?.data?.token;
    const userId = response?.data?.id;
    const email = response?.data?.email;
    const name = response?.data?.name;
    const userObject = {
      id: userId,
      email: email,
      name: name,
    };

    if (accessToken && userObject) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(userObject));

      return { email: email, accessToken: accessToken, id: userId };
    }
  };

  register = async (credentials: RegisterForm, language: string) => {
    const response = await axiosPublic.post("/auth/register-organizer", {
      ...credentials,
      language,
    });
    if (response.data.success === true) {
      // await this.login({ email: credentials.email, password: credentials.password });
      return true;
    }
  };

  getComplexBuildingsAndUnitTypes = async (): Promise<Organization[]> => {
    try {
      const response = await axiosAuthenticated.get(
        `organizations/organizations-by-organizer`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  getEventsByOrganization = async (
    id: number
  ): Promise<{ events: EventResDto[]; organization: Organization }> => {
    try {
      const response = await axiosPublic.get(
        `events/events-by-organization/${id}`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  getAllOrganizations = async (): Promise<OrganizationsForSearch[]> => {
    try {
      const response = await axiosPublic.get(
        `organizations/get/all-organizations`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  createNewEvent = async (
    eventData: CreateEventDto,
    organizationId: number
  ) => {
    try {
      const response = await axiosPublic.post(
        `events/${organizationId}`,
        eventData
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  updateEvent = async (eventData: CreateEventDto, eventId: number) => {
    try {
      const response = await axiosAuthenticated.put(
        `events/${eventId}`,
        eventData
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  deleteEvent = async (eventId: number) => {
    try {
      const response = await axiosAuthenticated.delete(`events/${eventId}`);
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  joinOrganizationViaCode = async (organizationCode: string) => {
    try {
      const response = await axiosAuthenticated.post(`organizations/join`, {
        code: organizationCode,
      });
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  generateOrganizationCode = async (organizationId: number) => {
    try {
      const response = await axiosAuthenticated.post(
        `organizations/generate-code/${organizationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  removeOrganizationFavorite = async (organizationId: number) => {
    try {
      const response = await axiosAuthenticated.delete(
        `organizations/favourite/${organizationId}`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  leaveOrganization = async (organizationId: number) => {
    try {
      const response = await axiosAuthenticated.post(
        `organizations/leave-organization/${organizationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getOrganizersFavorites = async () => {
    try {
      const response = await axiosAuthenticated.get(
        `organizations/favorites/get-favorites-for-organizer`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  addOrganizationToFavorite = async (organizationData: { id: number }) => {
    try {
      const response = await axiosAuthenticated.post(
        `organizations/favourite`,
        organizationData
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  getOrganizerFavoritesIds = async () => {
    try {
      const response = await axiosAuthenticated.get(
        `organizations/favourite/ids`
      );
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
  getEventByEventId = async (
    eventId: number
  ): Promise<FetchedEventDataBuyer> => {
    try {
      const response = await axiosAuthenticated.get(`events/${eventId}`);
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };

  // TODO
  logout = async () => {
    // const response = await axiosPublic.post('/logout')
    // return response.data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  };

  validateRecaptcha = async (token: string) => {
    try {
      const response = await axiosPublic.post(`auth/verify-recaptcha`, {
        token,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //Buyer

  getLiveEvents = async (): Promise<FetchedEventDataBuyer[]> => {
    try {
      const response = await axiosAuthenticated.get(`events/live/get-all`);
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  };
}

export const http = new HTTP();
