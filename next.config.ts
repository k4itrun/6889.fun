import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';
import pkg from './package.json';

const withMDX = createMDX();

const commonHeaders = [
 { key: 'Access-Control-Allow-Origin', value: '*' },
 { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
 { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Accept, Origin' },
 { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
 { key: 'X-Content-Type-Options', value: 'nosniff' },
 { key: 'X-DNS-Prefetch-Control', value: 'on' },
 { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
 { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
 { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const contentHeaders = (key: string, contentType: string) => [{ key, value: contentType }];

const nextConfig: NextConfig = {
 eslint: {
  ignoreDuringBuilds: true,
 },

 productionBrowserSourceMaps: true,

 images: {
  unoptimized: true,
  remotePatterns: [
   {
    protocol: 'https',
    hostname: 'opengraph.githubassets.com',
    pathname: '**',
   },
   {
    protocol: 'https',
    hostname: 'cdn.discordapp.com',
    pathname: '**',
   },
   {
    protocol: 'https',
    hostname: 'media.discordapp.net',
    pathname: '**',
   },
  ],
 },

 async headers() {
  return [
   {
    source: '/(.*)',
    headers: commonHeaders,
   },
   {
    source: '/(.*).xml',
    headers: contentHeaders('Content-Type', 'application/xml'),
   },
   {
    source: '/(.*).json',
    headers: [...contentHeaders('Content-Type', 'application/json'), ...contentHeaders('Cache-Control', 'public, max-age=604800, must-revalidate')],
   },
   {
    source: '/favicon.ico',
    headers: contentHeaders('Cache-Control', 'public, max-age=31536000, must-revalidate'),
   },
  ];
 },

 async redirects() {
  return [
   { source: '/discord', destination: 'https://discord.gg/', permanent: true },
   { source: '/discord-server', destination: '/discord', permanent: true },
   { source: '/youtube', destination: `https://youtube.com/@${pkg.author}`, permanent: true },
   { source: '/spotify', destination: 'https://open.spotify.com/intl-es/artist/3EiLUeyEcA6fbRPSHkG5kb', permanent: true },
   { source: '/github', destination: `https://github.com/${pkg.author}`, permanent: true },
   { source: '/repo', destination: `https://github.com/${pkg.author}/${pkg.name}`, permanent: true },
   { source: '/instagram', destination: `https://instagram.com/@kobebryant`, permanent: true },
   // custom redirects
   { source: '/youngxsanty', destination: 'https://guns.lol/youngxsanty', permanent: true },
   { source: '/r/:path*', destination: '/:path*', permanent: true },
  ];
 },
};

// later I add MDX blogs
export default withPlugins([withMDX], nextConfig);
