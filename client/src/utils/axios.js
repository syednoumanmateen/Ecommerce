import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const shouldAuth = Boolean(config.auth);
    delete config.auth;

    if (shouldAuth) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      } catch (err) {
        console.error("Invalid user in localStorage:", err);
      }
    }

    if (config.data && config.data.auth !== undefined) {
      const { auth: _auth, ...cleanedData } = config.data;
      config.data = cleanedData;
    }

    if (config.params && config.params.auth !== undefined) {
      const { auth: _auth, ...cleanedParams } = config.params;
      config.params = cleanedParams;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
