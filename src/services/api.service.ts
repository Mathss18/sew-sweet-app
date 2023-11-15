import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (response) => {
    const status = response.response ? response.response.status : null;
    if (status === 401) {
      window.location.href = "/";
      localStorage.removeItem("token");
    }

    return Promise.reject(response);
  }
);

export default api;
