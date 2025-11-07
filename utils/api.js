import axios from "axios";
import { store } from "../src/redux/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include the access token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors (access token expiration)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const { data } = await axios.post(
            `${
              import.meta.env.VITE_API_URL || "http://localhost:5000/api"
            }/auth/token`,
            { refreshToken }
          );
          console.log("data ===== ", data);
          // Store new tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Update the authorization header with the new access token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Handle logout if refresh fails
        store.dispatch(LogoutAction()); // Dispatch logout action
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
