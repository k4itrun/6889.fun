import { SWRData } from "@/interfaces";
import { SWRConfig } from '@k4itrunconfig';
import useSWR, { SWRResponse } from 'swr';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default function SWR<T = SWRData>(
  url: string
): SWRResponse<T, any> {
  const fetcher = (href: string) =>
    axios
      .get(href)
      .then((res) => res.data)
      .catch((error) => {
        return error?.response?.data ?? null;
      });
  return useSWR<T>(url, fetcher, { refreshInterval: SWRConfig.interval });
}
