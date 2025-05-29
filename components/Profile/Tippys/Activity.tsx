import { Icons } from '@/components/UI/Icons';
import Image from '@/components/UI/Image';
import { truncateText } from '@/lib/utils';

export interface ActivityTippyProps extends React.ComponentPropsWithRef<'div'> {
 activity: ResponseProfile['activities'][number];
 elapsedActivityTime: string;
}

export function ActivityTippy({ activity, elapsedActivityTime, ref }: ActivityTippyProps) {
 if (!activity) return null;
 return (
  <>
   <div
    ref={ref}
    className="w-72 rounded-md bg-white p-4 text-left shadow-lg dark:bg-black"
   >
    <div className="flex items-center space-x-3">
     {activity?.assets?.large_image ? (
      <Image
       src={activity.assets.large_image.startsWith('mp:external/') ? `https://media.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}` : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`}
       alt={truncateText(activity?.assets?.large_text || 'Activity', 10)}
       className="rounded-md"
       width={50}
       height={50}
      />
     ) : (
      <Icons.Unknown
       style={{ maxWidth: '60px' }}
       className="rounded-md"
       width={50}
       height={50}
      />
     )}
     <div>
      <p className="text-lg font-semibold">{truncateText(activity?.name, 15)}</p>
      <p className="text-sm text-gray-500">{truncateText(activity?.state, 30)}</p>
     </div>
    </div>
    <p className="mt-2 text-sm">{truncateText(activity?.details || 'No details available', 40)}</p>
    <div className="mt-3 flex items-center space-x-2">
     {activity?.assets?.small_image ? (
      <Image
       src={activity.assets.small_image.startsWith('mp:external/') ? `https://media.discordapp.net/external/${activity.assets.small_image.replace('mp:external/', '')}` : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.webp`}
       alt={activity.assets?.small_text}
       className="rounded-md"
       width={25}
       height={25}
      />
     ) : (
      <Icons.Unknown
       style={{ maxWidth: '60px' }}
       className="rounded-md"
       width={25}
       height={25}
      />
     )}
     <p className="text-sm text-gray-500">{truncateText(activity?.assets?.small_text || `Chillin' with ${activity?.name.substring(0, 5)}...`, 15)}</p>
     <p className="flex items-center gap-1 text-sm text-green-500">
      <Icons.Gamepad2 className="size-5 stroke-2" /> <span>{elapsedActivityTime}</span>
     </p>
    </div>
   </div>
  </>
 );
}
