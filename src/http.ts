import axios from "axios";
import { config } from "./config";
import {
  CreateEventDto,
  EventResDto,
  LoginForm,
  Organization,
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
    const response = await axiosPublic.post("/auth/register", {
      ...credentials,
      language,
    });
    if (response.data.success === true) {
      // await this.login({ email: credentials.email, password: credentials.password });
      return true;
    }
  };

  getComplexBuildingsAndUnitTypes = async (
    id: number
  ): Promise<Organization[]> => {
    try {
      const response = await axiosPublic.get(
        `organizations/organizations-by-organizer/${id}`
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
}

export const http = new HTTP();
