import type { MetadataRoute } from 'next';
import { meta } from '@/config';

export default function manifest(): MetadataRoute.Manifest {
 return {
  name: meta.title,
  short_name: meta.title,
  description: meta.description,
  scope: '/',
  display: 'minimal-ui',
  start_url: '/?source=pwa',
  background_color: '#fff',
  theme_color: '#FF00FF',
  icons: [
   {
    src: '/favicon.ico',
    sizes: '48x48',
    type: 'image/x-icon',
   },
  ],
 };
}
