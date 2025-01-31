import axios from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;
const BASE_URLWAHANAK = process.env.NEXT_PUBLIC_BASE_WAHANAK;
const WAHANAK_TOKEN = process.env.NEXT_PUBLIC_WAHANAK_TOKEN;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosE = axios.create({
  baseURL: BASE_URLWAHANAK,
  headers: {
    token: WAHANAK_TOKEN,
    "Content-Type": "application/json",
  },
});

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use(
  async (conf) => {
    const session = await getSession();
    if (!conf.headers["Authorization"]) {
      conf.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
    }
    return conf;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    const session = await getSession();
    if (!session) {
      const error = new Error("Unauthorized");
      return Promise.reject(error);
    }
    const prevRequest = error.config;
    if (error.response.status == 401 && !prevRequest.sent) {
      prevRequest.sent = true;
      const newTokenRes = await fetch("/api/refresh");
      const newToken = await newTokenRes.json();
      prevRequest.headers["Authorization"] = `Bearer ${newToken?.access_token}`;
      return axiosAuth(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { axiosAuth, axiosE };
