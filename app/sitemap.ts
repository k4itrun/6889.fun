import { type MetadataRoute } from 'next';
import { meta } from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
 const routes = ['/'].map((path) => ({
  url: new URL(path, meta.url).href,
  lastModified: new Date().toISOString().split('T')[0],
 }));

 return [...routes];
}
