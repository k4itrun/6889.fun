import { Profile, Repository } from "@/interfaces";
import { technologiesConfig, metaConfig } from '@k4itrunconfig';

import GlowEffect from "@/components/client/GlowEffect";
import useSWR from '@/lib/useSWR';

import Tippy from "@tippyjs/react";

export default function Home() {
  const { data: _profile } = useSWR<{ data: Profile } | null>("/api/lanyard");
  const profile = _profile ? _profile.data : null;

  const { data: _repositories } = useSWR<Repository[]| null>("/api/repos");
  const repositories = _repositories;

  const statuses = {
    dnd: {
      label: "Do not Disturb",
    },
    idle: {
      label: "Idle",
    },
    online: {
      label: "Online",
    },
    offline: {
      label: "Offline",
    },
  };

  return (
    <>
      <GlowEffect >
        <div className="bg-primary/5 dark:bg-neutral-700/10 shadow-xl rounded-lg w-full h-auto mt-6">
          {
            _profile ? (
              profile ? (
                <div className="relative">
                  <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
                    <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                      <div className="flex items-center">
                        <p className="text-black dark:text-white text-4xl font-semibold">{metaConfig.name}</p>
                        {profile.discord_status !== "offline" && (
                          <Tippy
                            content={`${statuses[profile.discord_status].label} on Discord`}
                            className={`text-${profile.discord_status}`}
                            animation="shift-away"
                            arrow={false}
                          >
                            <span
                              className={`ml-2 text-${profile.discord_status} px-2 py-1 font-normal rounded-md text-sm`}
                            >
                              <i className={`fa fa-circle text-${profile.discord_status} mr-2`} />
                              {statuses[profile.discord_status].label}
                            </span>
                          </Tippy>
                        )}
                      </div>
                      <p className="text-black dark:text-white text-md mt-3">{metaConfig.description}</p>
                    </div>
                    <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                      <img
                        alt="k4itrun"
                        src={`https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}`}
                        width="160"
                        height="160"
                        className="bg-neutral-700 w-[160px] h-[160px] rounded-full"
                      />
                      <div className={`pulse-avatar-${profile.discord_status} rounded-full flex items-center absolute bottom-2 right-2`}>
                        <Tippy
                          content={statuses[profile.discord_status].label}
                          className={`text-${profile.discord_status}`}
                          animation="shift-away"
                          arrow={false}
                        >
                          <div className={`bg-white dark:bg-secondary w-8 h-8 border-2 border-${profile.discord_status} rounded-full`} />
                        </Tippy>
                      </div>
                    </div>
                  </div>

                  <span
                    style={{ zIndex: "-1" }}
                    className="text-black/10 dark:text-white/5 absolute bottom-3 left-7 text-xl sm:text-2xl md:text-4xl lg:text-3xl font-semibold"
                  >
                    {metaConfig.shortDescription}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
                  <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                    <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[24px] rounded-md" />
                    <div className="mt-2 bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[95%] h-[96px] rounded-md" />
                  </div>
                  <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                    <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[160px] h-[160px] rounded-full" />
                    <div className="absolute bottom-1 right-5 bg-neutral-400 dark:bg-neutral-700/50 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
                  </div>
                </div>
              )) : (
                <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
                <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                  <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[24px] rounded-md" />
                  <div className="mt-2 bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[95%] h-[96px] rounded-md" />
                </div>
                <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                  <div className="bg-neutral-400 dark:bg-neutral-700/50 animate-pulse w-[160px] h-[160px] rounded-full" />
                  <div className="absolute bottom-1 right-5 bg-neutral-400 dark:bg-neutral-700/50 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
                </div>
              </div>
            )
          }
        </div>
      </GlowEffect >

      <div className="mx-auto max-w-7xl my-24">
        <h1 className="font-display text-5xl font-medium sm:text-5xl text-gray-900 dark:text-white">
          My <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute -mt-1 ml-1 top-3/5 left-0 h-[0.45em] w-full fill-primary/20 rotate-180"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">repositories</span>
          </span>
          <p className="text-xl text-gray-600 dark:text-white/50 font-normal">
            Github random Code.
          </p>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12">
          {
            _repositories ?
              repositories ? (
                repositories
                  .sort((a, b) => b.stargazers_count - a.stargazers_count)
                  .map((repo, index) => (
                    <a
                      key={index}
                      href={`https://github.com/${repo.full_name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative bg-gray-100 dark:bg-gray-600/5 dark:shadow-2xl border border-gray-300 hover:border-primary dark:hover:border-primary dark:border-gray-500/25 hover:shadow-xl rounded-lg p-2.5 transition-all duration-200"
                    >
                      <img
                        alt={repo.full_name}
                        src={`https://opengraph.githubassets.com/HEAD/${repo.full_name}`}
                        width="1024"
                        className="rounded-lg"
                        height="512"
                      />
                      <p className="text-md text-gray-900 dark:text-white">
                        <span className="text-sm text-gray-600 dark:text-white/50 bg-gray-200 dark:bg-neutral-700/25 px-2 py-1 rounded-md mr-1">
                          {repo.owner.login}
                        </span>
                        {repo.name.length > 18 ? `${repo.name.substring(0, 18)}...` : repo.name}
                      </p>
                      <p className="text-md text-gray-600 dark:text-white/50">
                        {repo.description?.length > 0
                          ? repo.description.length > 40
                            ? `${repo.description.substring(0, 40)}...`
                            : repo.description
                          : "Did you know that this repository is unique?"}
                      </p>
                      <div className="mt-5 flex justify-between items-center">
                        <Tippy content="Stars" arrow={false} animation="shift-away">
                          <div className="flex items-center">
                            <i className="fal fa-star mr-2" />
                            <p>{repo.stargazers_count}</p>
                          </div>
                        </Tippy>
                        <div className="flex items-center">
                          <img
                            src={`https://skillicons.dev/icons?i=${repo.language?.toLowerCase() || "empty"}`}
                            alt={repo.language}
                            className="w-4 h-4 mr-2"
                          />
                          <p className="text-sm text-gray-900 dark:text-white bg-gray-200 dark:bg-neutral-700/25 px-2 py-1 rounded-md">
                            {repo.language || "Empty"}
                          </p>
                        </div>
                        <Tippy content="Forks" arrow={false} animation="shift-away">
                          <div className="flex items-center">
                            <p>{repo.forks}</p>
                            <i className="fal fa-code-branch ml-2" />
                          </div>
                        </Tippy>
                      </div>
                    </a>
                  ))) : Array.from({ length: 6 }).map((_, index) => (
                    <a key={index} className="group relative bg-gray-600/5 dark:bg-gray-600/5 rounded-lg p-2.5 transition-all duration-200">
                      <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-full h-[180px] rounded-lg" />
                      <div className="mt-3">
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[16px] rounded-md" />
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-3/4 h-[14px] mt-2 rounded-md" />
                      </div>
                      <div className="mt-3">
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-full h-[14px] rounded-md" />
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-3/4 h-[14px] mt-2 rounded-md" />
                      </div>
                      <div className="mt-5 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-12 h-[12px] rounded-md" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-16 h-[12px] rounded-md" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-12 h-[12px] rounded-md" />
                        </div>
                      </div>
                    </a>
                  )) : Array.from({ length: 9 }).map((_, index) => (
                    <a key={index} className="group relative bg-gray-600/5 dark:bg-gray-600/5 rounded-lg p-2.5 transition-all duration-200">
                      <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-full h-[180px] rounded-lg" />
                      <div className="mt-3">
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-1/2 h-[16px] rounded-md" />
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-3/4 h-[14px] mt-2 rounded-md" />
                      </div>
                      <div className="mt-3">
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-full h-[14px] rounded-md" />
                        <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-3/4 h-[14px] mt-2 rounded-md" />
                      </div>
                      <div className="mt-5 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-12 h-[12px] rounded-md" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-16 h-[12px] rounded-md" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-[16px] h-[16px] rounded-full" />
                          <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-12 h-[12px] rounded-md" />
                        </div>
                      </div>
                    </a>
                  ))
          }
        </div>
      </div>


      <div className="mx-auto max-w-7xl my-24">
        <h1 className="font-display text-5xl font-medium sm:text-5xl text-black dark:text-white text-right">
          My <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute -mt-1 ml-1 top-3/5 left-0 h-[0.45em] w-full fill-primary/20 rotate-180"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Tech</span>
          </span>
          <p className="text-xl text-black/50 dark:text-white/50 font-normal">
            Technologies currently used.
          </p>
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-12">
          {
            technologiesConfig ?
              technologiesConfig ? (
                technologiesConfig.map((tech, index) => (
                  <div key={index} className="group flex justify-between items-center relative bg-gray-600/5 dark:shadow-2xl overflow-hidden border border-gray-500/25 hover:border-primary hover:shadow-xl rounded-lg p-2.5 transition-all duration-200">
                    <img
                      src={tech.src}
                      width="32"
                      height="32"
                      className="bg-white/5 p-1 w-[32px] h-[32px] rounded-md"
                      alt={tech.name}
                    />
                    <div className="relative">
                      <h2 className="font-display text-s font-medium text-black dark:text-white">
                        {tech.name}
                      </h2>
                    </div>
                  </div>
                ))) : Array.from({ length: 20 }).map((_, index) => (
                  <div key={index} className="group flex justify-between items-center relative bg-gray-200 dark:bg-neutral-700/20 overflow-hidden border-gray-500/25 rounded-lg p-2.5 transition-all duration-200">
                    <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse p-1 w-[32px] h-[32px] rounded-md" /><div className="relative flex-1 ml-4">
                      <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-24 h-[16px] rounded-md" />
                    </div>
                  </div>
                )) : Array.from({ length: 20 }).map((_, index) => (
                  <div key={index} className="group flex justify-between items-center relative bg-gray-200 dark:bg-neutral-700/20 overflow-hidden border-gray-500/25 rounded-lg p-2.5 transition-all duration-200">
                    <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse p-1 w-[32px] h-[32px] rounded-md" /><div className="relative flex-1 ml-4">
                      <div className="bg-neutral-300 dark:bg-neutral-700/50 animate-pulse w-24 h-[16px] rounded-md" />
                    </div>
                  </div>
                ))
          }
        </div>
      </div>

    </>
  );
}
