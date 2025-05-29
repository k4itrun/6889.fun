import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { Icons } from '@/components/UI/Icons';
import Image from '@/components/UI/Image';
import { meta } from '@/config';
import { cn, truncateText } from '@/lib/utils';

const badgeVariants = cva('group relative rounded-lg border border-gray-300 bg-gray-100 p-2.5 transition-all duration-200 hover:border-[var(--color-layout)] hover:shadow-xl dark:border-gray-500/25 dark:bg-gray-600/5 dark:shadow-2xl dark:hover:border-[var(--color-layout)]', {
 variants: {
  size: {
   small: 'text-sm px-2 py-1',
   medium: 'px-2 py-1',
   big: 'text-lg px-3 py-2',
  },
 },
 defaultVariants: {
  size: 'medium',
 },
});

interface CardRepository {
 repository: ResponseRepository;
}

export const CardGHRepository: React.FC<Omit<React.ComponentPropsWithRef<typeof Link>, 'href'> & VariantProps<typeof badgeVariants> & CardRepository> = ({ repository, size, className, ...props }) => {
 return (
  <Link
   {...props}
   className={cn(badgeVariants({ size }), className)}
   target="_blank"
   rel="noreferrer"
   href={`https://github.com/${repository.owner.name}/${repository.name}`}
  >
   <Image
    alt={truncateText(repository.name, 18)}
    src={repository.og}
    fallbackImage="/assets/og-gh-template.png"
    width={1024}
    height={512}
    className="rounded-lg"
   />
   <p className="text-md text-gray-900">
    <span className="mr-1 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600 dark:bg-neutral-700/25 dark:text-white/50">{repository.owner.name}</span>
    {truncateText(repository.name, 18)}
   </p>
   <p className="text-md text-gray-600 dark:text-white/50">{truncateText(repository.description || 'Did you know that this repository is unique?', 40)}</p>
   <div className="mt-5 flex items-center justify-between">
    <div>
     <div className="flex items-center">
      <Icons.Star className="size-5 stroke-2" />
      <span className="rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-neutral-700/25">{repository.stargazerCount}</span>
     </div>
    </div>
    <div className="flex items-center">
     <Image
      src={`https://skillicons.dev/icons?i=${repository.languages[0]?.node.name?.replace(/\.| /g, '').toLowerCase()}`}
      alt={repository.languages[0]?.node.name || 'Unknown'}
      width={20}
      height={20}
      className="mr-2"
     />
     <span className="rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-neutral-700/25">{repository.languages[0]?.node.name || 'Empty'}</span>
    </div>
    <div>
     <div className="flex items-center">
      <span className="rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-neutral-700/25">{repository.forks}</span>
      <Icons.GitFork className="size-5 stroke-2" />
     </div>
    </div>
   </div>
  </Link>
 );
};

export const CardGHLoading: React.FC<Omit<React.ComponentPropsWithRef<typeof Link>, 'href'> & VariantProps<typeof badgeVariants>> = ({ size, className, ...props }) => {
 return (
  <Link
   {...props}
   className={cn(badgeVariants({ size }), className)}
   target="_blank"
   rel="noreferrer"
   href={meta.accounts.github.url}
  >
   <div className="h-[180px] w-full animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-700/50" />
   <div className="mt-3">
    <div className="h-[16px] w-1/2 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
    <div className="mt-2 h-[14px] w-3/4 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
   </div>
   <div className="mt-3">
    <div className="h-[14px] w-full animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
    <div className="mt-2 h-[14px] w-3/4 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
   </div>
   <div className="mt-5 flex items-center justify-between">
    <div className="flex items-center space-x-2">
     <div className="h-[16px] w-[16px] animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700/50" />
     <div className="h-[12px] w-12 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
    </div>
    <div className="flex items-center space-x-2">
     <div className="h-[16px] w-[16px] animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700/50" />
     <div className="h-[12px] w-16 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
    </div>
    <div className="flex items-center space-x-2">
     <div className="h-[16px] w-[16px] animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700/50" />
     <div className="h-[12px] w-12 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
    </div>
   </div>
  </Link>
 );
};
