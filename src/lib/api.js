import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:5000'

console.log(API_URL);
const instance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers = {
      token: `${token}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
