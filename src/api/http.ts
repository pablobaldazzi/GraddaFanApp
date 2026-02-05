import axios from 'axios';
import { env } from '@/src/config/env';
import { getAuthToken } from '@/src/auth/token';

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20_000,
});

http.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    // Adjust header name if backend expects something else.
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});
