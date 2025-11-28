import axios from "axios";
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

export async function controller(path, method = "GET", body = null) {
  const response = await api({
    url: path,
    method,
    data: body,
  });

  return response.data;
}
