'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { useEffect, useState } from 'react';
import { ContextMenu } from '@/components/Cursor/ContextMenu';
import { Cursor } from '@/components/Cursor/Cursor';

export const Providers = ({ children }: { children: React.ReactNode }) => {
 const [color, setColor] = useState<string | undefined>(undefined);

 useEffect(() => {
  const updateColor = () => {
   const storedColor = localStorage.getItem('color');
   if (storedColor) {
    setColor(storedColor);
    document.documentElement.style.setProperty('--color-layout', storedColor);
   }
  };
  updateColor();
  window.addEventListener('color', updateColor);
  return () => {
   window.removeEventListener('color', updateColor);
  };
 }, []);

 return (
  <>
   <ProgressProvider
    color={color}
    height="2px"
    options={{ showSpinner: false }}
    shallowRouting
   >
    <Cursor />
    <ContextMenu>{children}</ContextMenu>
   </ProgressProvider>
  </>
 );
};
