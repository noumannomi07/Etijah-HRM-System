import axios from "axios";
import Cookies from "js-cookie";
import { FullRoutes } from "../Routes/routes";
import { API_STATUS_CODE } from "@/types/api";
import i18next from "i18next";

export const ACCESS_TOKEN_KEY = "access_token";
export const AUTHORIZATION_KEY = "Authorization";
export const LAST_VISITED_PAGE_KEY = "last_visited_page";

// Axios instance for tenant/dashboard APIs (with /tenant prefix)
const axiosInstance = axios.create({
  // baseURL: "https://etgah.syntecheg.com/tenant",
  baseURL: import.meta.env.VITE_BACKEND_URL,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get(ACCESS_TOKEN_KEY);
    if (config?.headers) {
      config.headers["Accept-Language"] = i18next.language;
      if (access_token) {
        config.headers[AUTHORIZATION_KEY] = `Bearer ${access_token}`;
      }
      
      // If data is FormData, remove Content-Type to let browser set it with boundary
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.access_token) {
      Cookies.set(ACCESS_TOKEN_KEY, response.data.access_token);
      axiosInstance.defaults.headers.common[AUTHORIZATION_KEY] = `Bearer ${response.data.access_token}`;
    }
    return response;
  },
  (error) => {
    const isUnAuthorized = error.response.status === API_STATUS_CODE.UNAUTHORIZED;
    if (error.response && isUnAuthorized) {
      Cookies.set(LAST_VISITED_PAGE_KEY, window.location.pathname);
      Cookies.remove(ACCESS_TOKEN_KEY);
      window.location.href = FullRoutes.Website.LoginWeb;
    }
    return Promise.reject(error);
  }
);

// Axios instance for website/client-side APIs (without /tenant prefix)
export const axiosWebsiteInstance = axios.create({
  baseURL: import.meta.env.VITE_WEBSITE_BACKEND_URL,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  },
});

// Request interceptor for website instance
axiosWebsiteInstance.interceptors.request.use(
  (config) => {
    if (config?.headers) {
      config.headers["Accept-Language"] = i18next.language;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for website instance
axiosWebsiteInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Website API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
