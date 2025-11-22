import { toastMessage } from "@/lib/custom-toast";
import axios, { AxiosInstance } from "axios";


export const createApiClient = (baseUrl?: string) : AxiosInstance => {

const client: AxiosInstance = axios.create({
  baseURL: baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

client.interceptors.request.use(
  async (config: any) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  ( response: any) => response,
  ( error: any) => {
    if (error?.response?.status === 401) {
      toastMessage("error", "Error", 'Session Expired, Please login again.');
      window.location.href = "/";
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user")
    }
    return Promise.reject(error);
  }
);
 return client
}