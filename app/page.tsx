import { CardGHLoading, CardGHRepository } from '@/components/CardGHRepository';
import { Profile } from '@/components/Profile/Profile';
import { Badge } from '@/components/UI/Badge';
import { Icons } from '@/components/UI/Icons';
import Image from '@/components/UI/Image';
import { meta, technologies } from '@/config';
import { GetRepositories } from '@/lib/graphql';

export default async function HomePage() {
 const repositories = await GetRepositories(meta.accounts.github.username);
 return (
  <>
   <Profile className="mx-auto" />
   <div className="mx-auto my-24 max-w-7xl">
    <h1 className="font-display text-5xl font-medium sm:text-5xl">
     My <Icons.SignatureLine placeholder="Repositories" />
     <p className="text-xl font-normal text-gray-600 dark:text-white/50">More than {repositories?.length || '0'} repositories that may be useless.</p>
    </h1>
    <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
     {repositories
      ? repositories
         .sort((a, b) => b.stargazerCount - a.stargazerCount)
         .map((repo, _) => {
          return (
           <CardGHRepository
            key={`card-repo-${repo.og}`}
            size="big"
            repository={repo}
           />
          );
         })
      : Array.from({ length: 6 }).map((key, _) => {
         return (
          <CardGHLoading
           key={`-card-repo-${key}`}
           size="big"
          />
         );
        })}
    </div>
   </div>
   <div className="mx-auto my-24 max-w-7xl">
    <h1 className="font-display text-right text-5xl font-medium sm:text-5xl">
     My <Icons.SignatureLine placeholder="Technologies" />
     <p className="text-xl font-normal text-gray-600 dark:text-white/50">I experiment with random technologies.</p>
    </h1>
    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
     {technologies
      ? technologies.map((technologie, _) => {
         return (
          <Badge
           key={`badge-technologie-${technologie.name}`}
           size="small"
          >
           <Image
            src={technologie.icon}
            alt={technologie.name}
            width={32}
            height={32}
            className="rounded-md bg-white/5 p-1"
           />
           {technologie.name}
          </Badge>
         );
        })
      : Array.from({ length: 20 }).map((key, _) => {
         return (
          <Badge
           key={`-badge-technologie-${key}`}
           size="small"
          >
           <div className="h-[32px] w-[32px] animate-pulse rounded-md bg-neutral-300 p-1 dark:bg-neutral-700/50" />
           <div className="relative ml-4 flex-1">
            <div className="h-[16px] w-24 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700/50" />
           </div>
          </Badge>
         );
        })}
    </div>
   </div>
  </>
 );
}
