declare module 'next-compose-plugins' {
 import type { NextConfig } from 'next';

 type Plugin = (nextConfig: NextConfig) => NextConfig;

 function withPlugins(plugins: Plugin[], config: NextConfig): NextConfig;

 export default withPlugins;
}
