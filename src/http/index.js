import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

//all the url end point of my backend api

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms = () => api.get("/api/rooms");

//Intersepters

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }

    throw error;
  }
);
export default api;
