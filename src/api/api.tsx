import axios, { Method } from "axios";
const API = "https://691e7e99bb52a1db22be0ee9.mockapi.io/api/v1";

export const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export async function controller<T = unknown>(
  path: string,
  method: Method = "GET",
  body: unknown = null
): Promise<T> {
  const config: any = {
    url: path,
    method,
  };

  if (body !== null && method !== "DELETE") {
    config.data = body;
  }

  const response = await api(config);
  return response.data;
}
