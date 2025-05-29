'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { header, meta } from '@/config';
import { randomColor } from '@/lib/utils';

export const Footer = () => {
 const [color, setColor] = useState<string>('');

 useEffect(() => {
  setColor(localStorage.getItem('color') || '');
  const colorInterval = setInterval(() => setColor(randomColor()), 1000);
  return () => clearInterval(colorInterval);
 }, []);

 return (
  <footer className="w-full bg-white/50 px-6 py-8 text-zinc-400 lg:px-12 dark:bg-black/50">
   <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:items-start lg:space-y-0">
    <Link
     href="/"
     className="flex items-center space-x-2 text-2xl font-bold"
    >
     <span className="rounded-lg bg-[var(--color-layout)] px-2 py-1 text-xs">v{meta.version}</span>
     <span className="transition-colors duration-200 hover:text-black dark:hover:text-white">{header.title}</span>
    </Link>
    <div className="text-center lg:text-right">
     <p className="mb-1">
      {header.title} &copy; 2020 - {new Date().getFullYear()}, All rights reserved.
     </p>
     <p className="flex items-center justify-center space-x-2 lg:justify-end">
      <span>Develop without</span>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-5 w-5"
       viewBox="0 0 24 24"
       onClick={() => setColor(randomColor())}
       style={{ fill: color, cursor: 'pointer', transition: 'fill 0.5s ease' }}
      >
       <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>by {meta.title}</span>
     </p>
    </div>
   </div>
  </footer>
 );
};
