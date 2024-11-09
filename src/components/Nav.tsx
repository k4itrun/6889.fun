import { headerConfig, metaConfig } from '@k4itrunconfig'

import { useTheme } from "@/context/ThemeProvider";

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { TransitionChild, Transition } from "@headlessui/react";
import Link from "next/link";

const { socials, pages } = headerConfig;

const randomColor = (): string => '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');

export default function Nav() {
    const router = useRouter();

    const [heartColor, setHeartColor] = useState<string | any>(metaConfig.tailwindColors.primary);
    const [isOpen, setMenu] = useState<boolean>(false);

    const { isTheme, toggleTheme } = useTheme();

    const setIsOpen = (value: any) => {
        if (value === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        setMenu(value);
    };

    return <>
        <div className="max-w-7xl mx-auto py-12 w-full px-6 lg:px-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-2xl font-bold transition-all duration-200"
                    >
                        {metaConfig.name}
                        <i
                            onClick={() => { setHeartColor(randomColor()) }}
                            style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}
                        >.
                        </i>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <i onClick={() => setIsOpen(true)} className="fas fa-bars text-2xl text-zinc-400 hover:text-black hover:dark:text-white cursor-pointer bg-gray-500/5 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200" />
                    <div onClick={() => toggleTheme()} className="text-2xl text-zinc-400 hover:text-black hover:dark:text-white cursor-pointer bg-gray-500/5 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200">
                        {isTheme === 'dark' ? <i className="fas fa-moon" /> : <i className="fas fa-sun" />}
                    </div>

                </div>
            </div>
        </div>

        <Transition
            show={isOpen}
            appear
        >
            <TransitionChild
                as={"div"}
                enter="transition-all duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed right-0 top-0 w-full h-full bg-black/50 z-[999]"
                onClick={
                    () => setIsOpen(false)
                }
            />
            <TransitionChild
                enter="transition-all duration-500"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
            >
                <div
                    style={{ zIndex: 999 }}
                    className="fixed right-0 top-0 w-full lg:w-[30rem] h-full bg-white dark:bg-secondary lg:rounded-l-2xl p-6 z-[1000]"
                >
                    <div className="flex justify-between w-full items-center">
                        <p className="text-2xl font-semibold">{metaConfig.name}</p>
                        <i onClick={() => setIsOpen(false)} className="fa fa-times w-12 h-12 hover:bg-gray-500/5 text-xl flex items-center justify-center transition-all duration-200 rounded-lg " />
                    </div>

                    <div className="mt-8 space-y-2">
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Menu</p>
                            <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                        </div>
                        {[...pages(router)].map((page, index) => {
                            return <Link
                                href={page.link}
                                key={index}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 text-xl transition-all duration-200 ${page.active ? 'bg-gray-500/5 text-black dark:text-white font-semibold' : 'hover:bg-gray-500/10 text-zinc-400 hover:text-black hover:dark:text-white'} px-4 py-3 rounded-lg`}
                            >
                                <i className={`${page.active ? page.icon.active : page.icon.default} w-6`} />
                                <p>{page.label}</p>
                            </Link>
                        })}
                    </div>

                    <div className="mt-8 space-y-2">
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Socials</p>
                            <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                        </div>
                        <div className="flex items-center gap-2">
                            {socials?.map((social, index) => {
                                return <a href={social.link} key={index} target="_blank" rel="noreferrer">
                                    <i className={`fab fa-${social.name} text-2xl text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200 w-12 h-12 flex justify-center items-center bg-gray-500/5 rounded-lg hover:bg-gray-500/10`} />
                                </a>
                            })}
                            <Link
                                href="/contact"
                                id="link"
                                className="flex gap-2 px-4 items-center w-full h-12 bg-gray-500/5 rounded-lg hover:bg-gray-500/10 transition-all duration-200 text-zinc-400 hover:text-black hover:dark:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="fas fa-envelope text-2xl" />
                                <p>Contact</p>

                            </Link>
                        </div>
                    </div>
                </div>
            </TransitionChild>
        </Transition>
    </>
}