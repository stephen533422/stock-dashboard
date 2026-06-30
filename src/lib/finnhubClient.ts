import axios from "axios";

const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
export const hasFinnhubKey = Boolean(API_KEY);

export const finnhub = axios.create({
  baseURL: "https://finnhub.io/api/v1",
});

finnhub.interceptors.request.use((config) => {
  config.params = { ...config.params, token: API_KEY };
  return config;
});
