import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
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
    ];

    if (!config.url?.includes('upload-profile-image')) {
      config.headers['Content-Type'] = 'application/json';
    }

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
