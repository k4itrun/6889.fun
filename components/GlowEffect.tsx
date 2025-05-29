'use client';

import { ReactNode, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

export interface GlowEffectProps extends React.ComponentPropsWithRef<typeof Tilt> {
 children: ReactNode;
 className?: string;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ children, className, ref, ...props }) => {
 const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

 useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  setIsDarkMode(mediaQuery.matches);

  const handleMediaQueryChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

  mediaQuery.addEventListener('change', handleMediaQueryChange);

  return () => {
   mediaQuery.removeEventListener('change', handleMediaQueryChange);
  };
 }, []);

 return (
  <>
   <Tilt
    {...props}
    ref={ref}
    glareEnable={true}
    glareMaxOpacity={isDarkMode ? 0.3 : 0.15}
    glareColor={isDarkMode ? '#ffffff' : '#000000'}
    glarePosition="all"
    glareBorderRadius="8px"
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
    className={cn('transition-all duration-300', className)}
   >
    {children}
   </Tilt>
  </>
 );
};
