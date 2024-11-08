import { SWRData } from "@/interfaces";

import fetch from 'isomorphic-unfetch';
import useSWR, { SWRResponse } from 'swr';

export default function SWR<T = SWRData>(
    url: string, 
    interval: number = 1000
): SWRResponse<T, any> {
  return useSWR<T>(
    url,
    (href) =>
      fetch(href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
    { refreshInterval: interval }
  );
}
