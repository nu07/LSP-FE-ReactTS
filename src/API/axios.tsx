import axios from "axios";
import authStore from "@/store/loginStore";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

// Interceptor Request
Axios.interceptors.request.use(
  (config) => {
    if (axios.isCancel(config)) {
      console.log("Request canceled:", config);
      return config;
    }

    // Ambil token secara dinamis dari Zustand
    const { token } = authStore.getState(); // Access state correctly
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Reset state jika error 401
      const { reset } = authStore.getState();
      reset();
    }
    return Promise.reject(error);
  }
);

export default Axios;
