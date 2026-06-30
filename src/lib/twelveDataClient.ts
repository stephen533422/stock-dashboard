import axios from "axios";

const API_KEY = import.meta.env.VITE_TWELVEDATA_KEY;
export const hasTwelveDataKey = Boolean(API_KEY);

export const twelveData = axios.create({
  baseURL: "https://api.twelvedata.com",
});

twelveData.interceptors.request.use((config) => {
  config.params = { ...config.params, apikey: API_KEY };
  return config;
});
