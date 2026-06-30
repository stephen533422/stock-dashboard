import axios from "axios";

export const yahoo = axios.create({
  baseURL: "/yahoo",
});
