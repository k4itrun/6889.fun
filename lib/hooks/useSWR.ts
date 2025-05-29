import { default as SWR, type BareFetcher, type SWRConfiguration, type SWRResponse } from 'swr';

type SWRData = Record<string, unknown> | Array<Record<string, unknown>>;

const fetcher = async <T>(url: string): Promise<T | null> => {
 try {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetcher error: ${r.status} ${r.statusText}`);
  const contentType = r.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
   return (await r.json()) as unknown as T;
  } else {
   throw new Error('Fetcher error: Response is not JSON');
  }
 } catch (error) {
  if (process.env.NODE_ENV === 'development') console.error(error);
  return null;
 }
};

// eslint-disable-next-line @eslint-react/hooks-extra/no-unnecessary-use-prefix
export function useSWR<T = SWRData>(url: string, interval: number = 3, ...args: Array<SWRConfiguration<T | null, unknown, BareFetcher<T | null>>>): SWRResponse<T | null, unknown> {
 const mergedConfig = args.reduce((acc, arg) => ({ ...acc, ...arg }), {});
 return SWR<T | null>(url, fetcher, {
  refreshInterval: interval * 1000,
  ...mergedConfig,
 });
}
