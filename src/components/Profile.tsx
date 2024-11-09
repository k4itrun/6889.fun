import { metaConfig } from '@k4itrunconfig';
import { Profile as ProfileInterface } from "@/interfaces";

import GlowEffect from "@/components/client/GlowEffect";
import Tippy from "@tippyjs/react";

interface ProfileProps {
  profile: ProfileInterface | null;
  _profile?: ProfileInterface | any;
}

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

export default function Profile({ profile, _profile }: ProfileProps) {
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
                        <p className="text-black dark:text-white text-4xl font-semibold">{metaConfig.name}†</p>
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
    </>
  );
};