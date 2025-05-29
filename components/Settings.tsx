/* eslint-disable import-x/order */
'use client';

import { Dialog, DialogBackdrop } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import Select from '@/components/Select';
import { Button, ButtonArrow } from '@/components/UI/Button';
import { Icons } from '@/components/UI/Icons';
import { header, meta } from '@/config';
import { cn } from '@/lib/utils/cn';

const { socials } = header;

export const Settings = () => {
 const { resolvedTheme, setTheme } = useTheme();
 const [isSettingsOpen, setSettingsState] = useState<boolean>(false);

 const pickerRef = useRef<HTMLDivElement | null>(null);
 const [showPicker, setShowPicker] = useState(false);

 const [liveColor, setLiveColor] = useState<string>('');

 useEffect(() => {
  const timeout = setTimeout(() => {
   localStorage.setItem('color', liveColor);
   window.dispatchEvent(new Event('color'));
  }, 150);

  return () => clearTimeout(timeout);
 }, [liveColor]);

 useEffect(() => {
  const cssColor = getComputedStyle(document.documentElement).getPropertyValue('--color-layout').trim();
  const storedColor = localStorage.getItem('color');
  const parsedColor = tinycolor(cssColor).toHexString();
  setLiveColor(storedColor ?? parsedColor);
 }, []);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (pickerRef.current && !pickerRef.current.contains(event.target as unknown as Node)) {
    setShowPicker(false);
   }
  };
  window.addEventListener('mousedown', handleClickOutside);
  return () => window.removeEventListener('mousedown', handleClickOutside);
 }, []);

 return (
  <>
   <Button
    variant="secondary"
    aria-label="Open settings"
    onClick={() => setSettingsState(true)}
    className={cn(
     {
      '!bg-neutral-300 dark:!bg-white/15': isSettingsOpen,
      '!bg-transparent hover:!bg-neutral-300 dark:hover:!bg-white/15': !isSettingsOpen,
     },
     'group ml-auto flex h-10 w-10 items-center justify-center px-2 !outline-none'
    )}
   >
    <Icons.SettingsIcon
     className={cn(
      {
       'rotate-90 dark:text-white': isSettingsOpen,
       'text-neutral-800 dark:text-neutral-200': !isSettingsOpen,
      },
      'h-5 w-5 shrink-0 duration-200 motion-reduce:transition-none dark:group-hover:text-white'
     )}
    />
   </Button>
   <Dialog
    transition
    as="div"
    className="fixed inset-0 z-50 ease-out focus:outline-none"
    open={isSettingsOpen}
    onClose={() => setSettingsState(false)}
   >
    <DialogBackdrop
     transition
     className="fixed inset-0 bg-black/50 backdrop-blur-sm duration-200 data-[closed]:opacity-0 motion-reduce:transition-none"
    />
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
     <div className="w-full max-w-md rounded-lg border border-white bg-white p-6 shadow-lg dark:border-neutral-800/50 dark:bg-black">
      <div className="mb-4 flex items-center justify-between">
       <div className="flex items-center gap-2 text-xl font-semibold">
        <Icons.Settings className="size-6" />
        <h2 className="text-xl font-semibold">Settings</h2>
       </div>
       <Button
        variant="secondary"
        aria-label="Open settings"
        onClick={() => setSettingsState(false)}
        className={cn(
         {
          '!bg-transparent hover:!bg-neutral-300 dark:hover:!bg-white/15': isSettingsOpen,
         },
         'group ml-auto flex h-10 w-10 items-center justify-center border border-white px-2 !outline-none dark:border-neutral-800/50'
        )}
       >
        <Icons.X
         className={cn(
          {
           'text-neutral-800 dark:text-neutral-200': isSettingsOpen,
          },
          'h-5 w-5 shrink-0 duration-200 motion-reduce:transition-none dark:group-hover:text-white'
         )}
        />
       </Button>
      </div>
      <p className="mb-6">Change settings like theme or decorations. Changes are saved automatically.</p>
      <div className="space-y-4">
       <div className="flex justify-center gap-8">
        <div className="flex cursor-auto flex-col items-center py-3 text-base select-none">
         <div className="flex items-center">
          <Icons.Palette className="mr-2 size-5 text-neutral-800/80 dark:text-neutral-300/50" />
          <span>Colors</span>
         </div>
         <div className="mt-2 w-40">
          {!liveColor ? (
           <div className="flex h-10 w-full items-center justify-center text-neutral-800">
            <Icons.RefreshCw className="size-5 animate-spin" />
           </div>
          ) : (
           <div
            className="relative w-full"
            ref={pickerRef}
           >
            <div
             onClick={() => setShowPicker((prev) => !prev)}
             className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-black/10 bg-white px-2 py-2 text-sm text-neutral-700 hover:border-black/30 hover:text-neutral-800 dark:border-neutral-800 dark:bg-black dark:text-neutral-200/75 dark:hover:border-neutral-800 dark:hover:text-neutral-200"
            >
             <div className="flex items-center truncate">
              <span
               className="mr-2 size-5 rounded-full"
               style={{
                backgroundColor: liveColor,
                border: `2px solid ${tinycolor(liveColor).darken(10).toString()}`,
                boxShadow: `0 0 5px ${liveColor}`,
               }}
              />
              <span>{liveColor.toUpperCase()}</span>
             </div>
             <Icons.ChevronsUpDown className="size-4 shrink-0 opacity-70" />
            </div>
            {showPicker && (
             <div className="absolute z-50 mt-2">
              <HexColorPicker
               color={liveColor}
               onChange={setLiveColor}
               className="rounded-xl border border-black/10 bg-white p-1.5 shadow-md hover:border-black/30 dark:border-neutral-800 dark:bg-black dark:hover:border-neutral-800"
              />
             </div>
            )}
           </div>
          )}
         </div>
        </div>
        <div className="flex cursor-auto flex-col items-center py-3 text-base select-none">
         <div className="flex items-center">
          <Icons.SunMoon className="mr-2 size-5 text-neutral-800/80 dark:text-neutral-300/50" />
          <span>Theme</span>
         </div>
         <div className="mt-2 w-40">
          {!resolvedTheme ? (
           <div className="flex h-10 w-full items-center justify-center text-neutral-800">
            <Icons.RefreshCw className="size-5 animate-spin" />
           </div>
          ) : (
           <Select
            text={
             <>
              {resolvedTheme === 'dark' ? (
               <>
                <Icons.Moon className="mr-1 size-5" />
                <span>Dark</span>
               </>
              ) : (
               <>
                <Icons.Sun className="mr-1 size-5" />
                <span>Light</span>
               </>
              )}
             </>
            }
            options={[
             {
              value: 'system',
              text: (
               <>
                <Icons.Laptop className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                <span>System</span>
               </>
              ),
             },
             {
              value: 'dark',
              disabled: resolvedTheme === 'dark',
              text: (
               <>
                <Icons.Moon className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                <span>Dark</span>
               </>
              ),
             },
             {
              value: 'light',
              disabled: resolvedTheme === 'light',
              text: (
               <>
                <Icons.Sun className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                <span>Light</span>
               </>
              ),
             },
            ]}
            value={resolvedTheme}
            onChange={(value) => setTheme(value)}
           />
          )}
         </div>
        </div>
       </div>

       <div className="mt-8">
        <div className="flex items-center gap-2">
         <p className="text-xs font-semibold whitespace-nowrap text-black/50 uppercase dark:text-white/20">Socials</p>
         <div className="h-px flex-grow bg-black/50 dark:bg-white/20" />
        </div>

        <div className="flex items-center gap-4">
         {socials.map((social) => {
          const Icon = Icons[social.icon] as React.ElementType;
          return (
           <Link
            key={`link-social-${social.name}`}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${social.name}`}
            className="transition-colors duration-200"
           >
            {Icon ? (
             <Icon
              className="h-6 w-6 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white"
              aria-hidden="true"
             />
            ) : (
             <Icons.XIcon
              className="h-6 w-6 text-red-700/70 hover:text-red-700"
              aria-hidden="true"
             />
            )}
           </Link>
          );
         })}
         <Button
          variant="tertiary"
          className="ml-auto flex h-11 w-full justify-between gap-2 px-4"
          asChild
         >
          <Link
           href="/discord"
           className="flex items-center gap-2"
           aria-label="Contact via Discord"
          >
           <Icons.Mail
            className="text-lg"
            aria-hidden="true"
           />
           <span>Contact</span>
           <ButtonArrow />
          </Link>
         </Button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
         <Button
          variant="primary"
          className="flex h-11 items-center gap-2 px-4"
          asChild
         >
          <Link
           href={`https://github.com/k4itrun/${meta.accounts.github.repo}`}
           target="_blank"
           rel="noopener noreferrer"
           className="flex items-center gap-2 text-xs"
           aria-label="View Source Code on GitHub"
          >
           <Icons.Code2
            className="text-lg"
            aria-hidden="true"
           />
           <span>View Source Code</span>
           <ButtonArrow />
          </Link>
         </Button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </Dialog>
  </>
 );
};
