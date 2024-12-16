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
      "/vehicles/list-vehicles",
      "/vehicles/vehicle-detail",
    ];

    if (!config.url?.includes("upload-profile-image") && 
        !config.url?.includes("update-vehicle")) {
      config.headers["Content-Type"] = "application/json";
    }

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
