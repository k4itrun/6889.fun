import { Icons } from '@/components/UI/Icons';
import Image from '@/components/UI/Image';
import { formatTime, truncateText } from '@/lib/utils';

export interface SpotifyTippyProps extends React.ComponentPropsWithRef<'div'> {
 spotify: ResponseProfile['spotify'];
 elapsedSpotifyTime: number;
 progress: number;
}

export function SpotifyTippy({ ref, spotify, elapsedSpotifyTime, progress }: SpotifyTippyProps) {
 if (!spotify) return null;
 return (
  <>
   <div
    ref={ref}
    className="w-72 rounded-md bg-white p-4 text-left shadow-lg dark:bg-black"
   >
    <div className="flex items-center space-x-3">
     <Image
      src={spotify.album_art_url}
      alt="Spotify Album Art"
      className="h-10 w-10 rounded-md"
     />
     <div>
      <p className="text-lg font-semibold">{truncateText(spotify?.song, 15)}</p>
      <p className="flex items-center gap-1 text-sm text-green-500">
       <Icons.Spotify className="size-5 stroke-2" /> <span>Listening to Spotify</span>
      </p>
     </div>
    </div>
    <div className="mt-2 flex justify-between text-sm">
     <p className="text-gray-500">{truncateText(spotify?.artist, 15)}</p>
     <p>{truncateText(spotify?.album, 15)}</p>
    </div>
    <div className="mt-3 flex items-center space-x-2">
     <Image
      src={spotify.album_art_url}
      alt="Spotify Album Art Small"
      className="h-5 w-5 rounded-md"
     />
     <div className="relative mt-1 h-0.5 w-full rounded-full bg-gray-300">
      <div
       className="h-0.5 rounded-full bg-green-500"
       style={{ width: `${progress}%` }}
      />
      <div
       className="absolute top-1 left-0 text-xs text-green-500"
       style={{ transform: 'translateX(5px)' }}
      >
       {formatTime(elapsedSpotifyTime)}
      </div>
      <div
       className="absolute top-1 right-0 text-xs text-gray-500"
       style={{ transform: 'translateX(-5px)' }}
      >
       {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
      </div>
     </div>
    </div>
   </div>
  </>
 );
}
