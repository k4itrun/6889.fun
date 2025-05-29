'use client';

import Tippy from '@tippyjs/react';
import { useEffect, useMemo, useState } from 'react';
import { GlowEffect, type GlowEffectProps } from '@/components/GlowEffect';
import { ActivityTippy } from '@/components/Profile/Tippys/Activity';
import { SpotifyTippy } from '@/components/Profile/Tippys/Spotify';
import Image from '@/components/UI/Image';
import { header, meta } from '@/config';
import { useProfile } from '@/lib/hooks';
import { cn, formatElapsedTimeSince } from '@/lib/utils';

const statuses: Record<ResponseProfile['discord_status'], { label: string }> = {
 dnd: { label: 'Do not Disturb' },
 idle: { label: 'Idle' },
 online: { label: 'Online' },
 offline: { label: 'Offline' },
};

export const Profile = ({ className, ...props }: Omit<GlowEffectProps, 'children'>) => {
 const profile = useProfile();

 const [elapsedActivityTime, setElapsedActivityTime] = useState<string>('');
 const [elapsedSpotifyTime, setElapsedSpotifyTime] = useState<number>(0);

 const activities = useMemo<Exclude<ResponseProfile['activities'][number], undefined> | null>(() => {
  if (!profile?.activities?.length) return null;
  return (
   profile.activities.find(
    // prettier
    (activity) => activity && activity.type !== 2 && activity.type !== 4
   ) || null
  );
 }, [profile]);

 const activity = useMemo(() => activities, [activities]);
 const spotify = useMemo(() => profile?.spotify, [profile]);

 // Activity time
 useEffect(() => {
  const start = activity?.timestamps?.start;
  if (!start) return;
  const update = () => setElapsedActivityTime(formatElapsedTimeSince(start));
  update();
  const interval = setInterval(update, 1000);
  return () => clearInterval(interval);
 }, [activity]);

 // Spotify time
 useEffect(() => {
  const timestamps = spotify?.timestamps;
  if (!timestamps) return;
  const { start, end } = timestamps;
  const prevStart = Number(localStorage.getItem('elapsedSpotifyTimeStart'));
  const prevEnd = Number(localStorage.getItem('elapsedSpotifyTimeEnd'));
  const hasChanged = start !== prevStart || end !== prevEnd;
  if (hasChanged) {
   setElapsedSpotifyTime(0);
   localStorage.setItem('elapsedSpotifyTimeStart', String(start));
   localStorage.setItem('elapsedSpotifyTimeEnd', String(end));
   localStorage.removeItem('elapsedSpotifyTime');
  }
 }, [spotify]);

 useEffect(() => {
  const timestamps = spotify?.timestamps;
  if (!timestamps) return;
  const { start, end } = timestamps;
  const total = end - start;
  const stored = Number(localStorage.getItem('elapsedSpotifyTime'));
  const initial = stored ? Math.min(stored, total) : 0;
  setElapsedSpotifyTime(initial);
  const interval = setInterval(() => {
   setElapsedSpotifyTime((prev) => {
    if (prev < total) {
     const updated = prev + 1000;
     localStorage.setItem('elapsedSpotifyTime', String(updated));
     return updated;
    }
    return prev;
   });
  }, 1000);
  return () => clearInterval(interval);
 }, [spotify]);

 // Spotify time progress
 const progress = useMemo(() => {
  const timestamps = spotify?.timestamps;
  if (!timestamps) return 0;
  const { start, end } = timestamps;
  const total = end - start;
  return total > 0 ? (elapsedSpotifyTime / total) * 100 : 0;
 }, [spotify, elapsedSpotifyTime]);

 return (
  <>
   <GlowEffect
    {...props}
    className={cn('mt-6 h-auto w-full rounded-lg bg-white/50 shadow-xl dark:bg-black/50', className)}
   >
    {profile ? (
     <div className="relative">
      <div className="flex h-full w-full flex-col items-center justify-between p-6 px-8 lg:flex-row">
       <div className="mt-5 flex w-full flex-col items-center justify-center lg:mt-0 lg:items-start lg:justify-start">
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
         <Tippy
          content={
           activity ? (
            <ActivityTippy
             activity={activity}
             elapsedActivityTime={elapsedActivityTime}
            />
           ) : spotify ? (
            <SpotifyTippy
             spotify={spotify}
             elapsedSpotifyTime={elapsedSpotifyTime}
             progress={progress}
            />
           ) : null
          }
          animation="shift-away"
          arrow={true}
         >
          <p className="flex cursor-pointer items-center text-4xl font-semibold">{profile.discord_user?.global_name || `${header.title}†`}</p>
         </Tippy>
         {profile.discord_status !== 'offline' && (
          <Tippy
           content={`${statuses[profile.discord_status].label || ''} on Discord`}
           className={`text-${profile.discord_status}`}
           animation="shift-away"
           arrow={false}
          >
           <span className={`text-${profile.discord_status} mt-2 flex items-center rounded-md px-2 py-1 text-sm font-normal lg:mt-0 lg:ml-2`}>
            <i className={`fa fa-circle text-${profile.discord_status} mr-2`} />
            {statuses[profile.discord_status].label || ''}
           </span>
          </Tippy>
         )}
        </div>
        <p className="text-md mt-3 text-center lg:text-left">{header.description}</p>
       </div>
       <div className="relative order-first h-[160px] w-[160px] flex-shrink-0 rounded-full lg:order-last">
        <Image
         alt={`Avatar of ${profile.discord_user?.global_name || header.title}`}
         src={profile.discord_user.avatar ? `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`}
         width={160}
         height={160}
         className="h-[160px] w-[160px] rounded-full bg-neutral-700"
        />
        <div className={`pulse-avatar-${profile.discord_status} absolute right-2 bottom-2 flex items-center rounded-full`}>
         <Tippy
          content={statuses[profile.discord_status].label}
          className={`text-${profile.discord_status}`}
          animation="shift-away"
          arrow={false}
         >
          <div className={`h-8 w-8 border-2 bg-white dark:bg-black border-${profile.discord_status} rounded-full`} />
         </Tippy>
        </div>
       </div>
      </div>
      <span
       style={{ zIndex: '-1' }}
       className="absolute bottom-3 left-7 text-xl font-semibold text-black/10 sm:text-2xl md:text-4xl lg:text-3xl dark:text-white/5"
      >
       {meta.shortDescription}
      </span>
     </div>
    ) : (
     <div className="flex h-full w-full flex-col items-center justify-between p-6 px-8 lg:flex-row">
      <div className="mt-5 flex w-full flex-col items-center justify-center lg:mt-0 lg:items-start lg:justify-start">
       <div className="h-[24px] w-1/2 animate-pulse rounded-md bg-neutral-400 dark:bg-neutral-700/50" />
       <div className="mt-2 h-[96px] w-[95%] animate-pulse rounded-md bg-neutral-400 dark:bg-neutral-700/50" />
      </div>
      <div className="relative order-first h-[160px] w-[160px] flex-shrink-0 rounded-full lg:order-last">
       <div className="h-[160px] w-[160px] animate-pulse rounded-full bg-neutral-400 dark:bg-neutral-700/50" />
       <div className="absolute right-5 bottom-1 h-[32px] w-[32px] animate-pulse rounded-full border-4 border-neutral-800 bg-neutral-400 dark:bg-neutral-700/50" />
      </div>
     </div>
    )}
   </GlowEffect>
  </>
 );
};
