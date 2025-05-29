'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Settings } from '@/components/Settings';
import { header } from '@/config';
import { randomColor } from '@/lib/utils';

export function Nav() {
 const [color, setColor] = useState<string>('');

 useEffect(() => {
  setColor(localStorage.getItem('color') || '');
 }, []);

 return (
  <>
   <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-0">
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-4">
      <Link
       href="/"
       className="text-2xl font-bold transition-all duration-200"
      >
       {header.title}
       <span
        onClick={() => setColor(randomColor())}
        style={{ color, cursor: 'pointer', fontSize: '1.5rem' }}
       >
        .
       </span>
      </Link>
     </div>
     <Settings />
    </div>
   </div>
  </>
 );
}
