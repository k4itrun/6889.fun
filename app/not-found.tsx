import Link from 'next/link';
import { Button } from '@/components/UI/Button';

export default function NotFound() {
 return (
  <div className="flex flex-col items-center justify-center space-y-6 py-56">
   <h1 className="bg-gradient-to-tr from-[var(--color-layout)] bg-clip-text text-6xl font-bold text-transparent">404</h1>
   <p className="text-2xl text-gray-500">Page not found.</p>
   <Button
    variant="primary"
    asChild
    className="mt-8"
   >
    <Link href="/">Back to top</Link>
   </Button>
  </div>
 );
}
