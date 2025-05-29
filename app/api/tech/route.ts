import { NextResponse } from 'next/server';
import { technologies } from '@/config';

export const dynamic = 'force-static';

export function GET() {
 return new NextResponse(JSON.stringify(technologies), {
  headers: {
   'content-type': 'application/json',
  },
 });
}
