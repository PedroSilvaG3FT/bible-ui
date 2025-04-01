import authStore from "@/store/auth.store";
import axios, { CreateAxiosDefaults } from "axios";

function _buildInstance<Data>(
  baseURL: string,
  config: CreateAxiosDefaults<Data> = {}
) {
  return axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    ...config,
  });
}

export const API_URL = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
export const APP_HTTP_CLIENT = _buildInstance(API_URL);

export const API_BIBLE_URL =
  process.env.VITE_API_BIBLE_URL || import.meta.env.VITE_API_BIBLE_URL;
export const BIBLE_HTTP_CLIENT = _buildInstance(API_BIBLE_URL);

APP_HTTP_CLIENT.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      const token = authStore?.getState()?.token || "";
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const _handleRedirect = async (error: any) => {
  const redirectUrl = error?.response?.headers?.location;

  const config = {
    ...error?.config,
    url: redirectUrl,
    baseURL: "",
  };

  try {
    const redirectedResponse = await axios(config);
    return redirectedResponse;
  } catch (redirectError) {
    return Promise.reject(redirectError);
  }
};

APP_HTTP_CLIENT.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response && error?.response?.status === 401) {
      authStore.getState().setToken("");
    }

    if (error?.response && error?.response?.status === 307) {
      return _handleRedirect(error);
    }

    return Promise.reject(error);
  }
);
