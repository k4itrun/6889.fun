'use client';

import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { Icons } from '@/components/UI/Icons';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
 return (
  <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
   <h1 className="bg-gradient-to-tr from-[var(--color-layout)] bg-clip-text text-6xl font-bold text-transparent">500</h1>
   <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Something went wrong.</p>
   <div className="mt-6 w-full max-w-2xl overflow-auto rounded-md bg-black p-4 text-left text-sm text-green-400 shadow-lg dark:bg-zinc-900">
    <pre className="font-mono break-words whitespace-pre-wrap">{error.message || 'Unknown error'}</pre>
   </div>
   <Button
    variant="primary"
    asChild
    className="mt-8"
   >
    <Link href="/">
     <Icons.RotateCw onClick={reset} />
     Try again
    </Link>
   </Button>
  </div>
 );
}
