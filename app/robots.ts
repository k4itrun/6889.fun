import type { MetadataRoute } from 'next';
import { meta } from '@/config';

export default function robots(): MetadataRoute.Robots {
 return {
  rules: [
   {
    userAgent: '*',
   },
  ],
  sitemap: new URL(`/sitemap.xml`, meta.url).href,
  host: meta.url,
 };
}
