'use client';

import { ReactNode } from 'react';

export const KeyShortcut = ({ keys, ...extraAttributes }: { keys: string[]; [key: string]: unknown }) => {
 const keyElements = keys.reduce<ReactNode[]>((acc, key, idx) => {
  if (idx > 0) acc.push(<span key={`separator-${key}`}>+</span>);
  acc.push(<span key={`key-${key}`}>{key}</span>);
  return acc;
 }, []);

 return (
  <div
   className="flex items-center justify-center gap-2 rounded-lg bg-black/10 px-2 py-1 text-xs text-zinc-400 transition-colors duration-200 dark:bg-white/10"
   {...extraAttributes}
  >
   {keyElements}
  </div>
 );
};
