/* eslint-disable import-x/order */
import { Analytics } from '@vercel/analytics/react';
import { type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Lexend_Deca as LexendDeca } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Providers } from '@/components/Providers';
import { meta } from '@/config';
import { cn } from '@/lib/utils';
import '@/app/globals.css';

export const metadata: Metadata = {
 metadataBase: new URL(meta.url),
 title: {
  default: meta.title,
  template: `%s | ${meta.title}`,
 },
 description: meta.description,
 alternates: {
  canonical: './',
 },
 keywords: meta.keywords,
 twitter: {
  title: meta.title,
  description: meta.description,
  creator: meta.accounts.twitter.username,
  card: 'summary_large_image',
 },
 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   'max-video-preview': -1,
   'max-image-preview': 'large',
   'max-snippet': -1,
  },
 },
 icons: {
  shortcut: '/favicon.ico',
 },
};

export const viewport: Metadata = {
 themeColor: [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: 'black' },
 ],
};

const Lexend = LexendDeca({
 subsets: ['latin'],
 weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
 variable: '--font-lexend',
 display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <>
   <html
    lang="en"
    suppressHydrationWarning
   >
    <body className={cn('font-lexend relative scroll-smooth bg-white text-black antialiased selection:bg-[var(--color-layout)]/20 dark:bg-black dark:text-white', Lexend.variable)}>
     <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      scriptProps={{ 'data-cfasync': 'false' }}
     >
      <Providers>
       <main
        className="h-full w-full border-y border-t-0 border-b-8 border-black/10 dark:border-black"
        data-vaul-drawer-wrapper=""
       >
        <div className="mx-auto min-h-screen w-full max-w-screen-lg p-5 transition-all duration-300 md:w-10/12 lg:w-8/12">
         <Nav />
         {children}
        </div>
       </main>
       <Footer />
       <div className="color-layout layout-primary position-right-top" />
       <div className="color-layout layout-secondary position-left-bottom" />
       <Analytics />
      </Providers>
     </ThemeProvider>
    </body>
   </html>
  </>
 );
}
