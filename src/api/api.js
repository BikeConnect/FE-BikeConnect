import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = [
      "/auth/owner-forgot-password",
      "/auth/owner-reset-password",
      "/customer/forgot-password",
      "/customer/reset-password",
      "/auth/owner-login",
      "/customer/customer-login",
      "/post/vehicles",
      "/post/vehicle-detail",
    ];

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found in localStorage");
      }
    }

    return config;
  },
  (error) => {
    console.error("Interceptor error:", error);
    return Promise.reject(error);
  }
);

export default api;
