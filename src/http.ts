import axios from "axios";
import { config } from "./config";
import { LoginForm, RegisterForm } from "./types";

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

  // TODO
  logout = async () => {
    // const response = await axiosPublic.post('/logout')
    // return response.data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  };
}

export const http = new HTTP();
