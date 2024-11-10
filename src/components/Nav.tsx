import { headerConfig, metaConfig } from '@k4itrunconfig';
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";
import { useRouter } from 'next/router';
import { TransitionChild, Transition } from "@headlessui/react";
import Link from "next/link";

const { socials, pages } = headerConfig;

const randomColor = (): string => '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');

export default function Nav() {
    const router = useRouter();
    const [heartColor, setHeartColor] = useState<string | any>(metaConfig.tailwindColors.primary);
    const [isOpen, setMenu] = useState(false);
    const [isSettingsOpen, setSettingsState] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const { isTheme, setTheme } = useTheme();

    const setIsOpen = (value: Boolean | any) => {
        document.body.style.overflow = value ? 'hidden' : 'auto';
        setMenu(value);
    };

    const setSettingsOpen = (value: Boolean | any) => {
        document.body.style.overflow = value ? 'hidden' : 'auto';
        setSettingsState(value);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto py-12 w-full px-6 lg:px-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold transition-all duration-200">
                            {metaConfig.name}
                            <i
                                onClick={() => { setHeartColor(randomColor()) }}
                                style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}
                            >.</i>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {/*<i onClick={() => setIsOpen(true)} className="fas fa-bars text-2xl text-zinc-400 hover:text-black hover:dark:text-white cursor-pointer bg-gray-500/5 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200" />*/}
                        <i onClick={() => setSettingsOpen(true)} className="fas fa-cog text-2xl text-zinc-400 hover:text-black hover:dark:text-white cursor-pointer bg-gray-500/5 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200" />
                    </div>
                </div>
            </div>

            {/* Configuration Modal */}
            <Transition show={isSettingsOpen} appear>
                <TransitionChild
                    as={"div"}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[999]"
                    onClick={() => setSettingsOpen(false)}
                />
                <TransitionChild
                    enter="transition-transform duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition-transform duration-300"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <div className="bg-white/60 dark:bg-secondary/60 p-6 rounded-lg max-w-md w-full shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
                                <i onClick={() => setSettingsOpen(false)} className="fa fa-times w-12 h-12 hover:bg-secondary/10 dark:hover:bg-secondary text-xl flex items-center justify-center transition-all duration-200 rounded-lg " />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Change settings like theme or decorations. Changes are saved automatically.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200">
                                        <i className="fas fa-adjust"></i>
                                        <span className="font-semibold">Theme</span>
                                    </label>
                                    <div className="relative mt-2">
                                        <button
                                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                                            className="w-full p-2 bg-primary/20 dark:bg-primary/20 rounded-lg text-gray-900 dark:text-gray-100 flex justify-between items-center"
                                        >
                                            {isTheme.charAt(0).toUpperCase() + isTheme.slice(1)}
                                            <i className={`fas fa-chevron-down transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}></i>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-full bg-white/50 dark:bg-primary/30 rounded-lg shadow-lg z-10 backdrop-blur-sm">
                                                <button
                                                    onClick={() => { setTheme("system"); setDropdownOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-gray-900 dark:text-gray-100 hover:bg-primary/10 dark:hover:bg-primary/20"
                                                >
                                                    System
                                                </button>
                                                <button
                                                    onClick={() => { setTheme("dark"); setDropdownOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-gray-900 dark:text-gray-100 hover:bg-primary/10 dark:hover:bg-primary/20"
                                                >
                                                    Dark
                                                </button>
                                                <button
                                                    onClick={() => { setTheme("light"); setDropdownOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-gray-900 dark:text-gray-100 hover:bg-primary/10 dark:hover:bg-primary/20"
                                                >
                                                    Light
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Socials</p>
                                        <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {socials?.map((social, index) => (
                                            <a href={social.link} key={index} target="_blank" rel="noreferrer">
                                                <i className={`fab fa-${social.name} text-2xl text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200 w-12 h-12 flex justify-center items-center bg-gray-500/5 rounded-lg hover:bg-gray-500/10`} />
                                            </a>
                                        ))}
                                        <Link
                                            href="/discord"
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
                        </div>
                    </div>
                </TransitionChild>
            </Transition>

            {/* Improved side menu 
            <Transition show={isOpen} appear>
                <TransitionChild
                    as={"div"}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 bg-black/50 z-[999]"
                    onClick={() => setIsOpen(false)}
                />
                <TransitionChild
                    enter="transition-all duration-300"
                    enterFrom="opacity-0 translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-full"
                >
                    <div className="fixed right-0 top-0 w-full lg:w-[30rem] h-full bg-white dark:bg-secondary lg:rounded-l-2xl p-6 z-[1000]">
                        <div className="flex justify-between w-full items-center">
                            <p className="text-2xl font-semibold">{metaConfig.name}</p>
                            <i onClick={() => setIsOpen(false)} className="fa fa-times w-12 h-12 hover:bg-gray-500/5 text-xl flex items-center justify-center transition-all duration-200 rounded-lg " />
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Menu</p>
                            <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                        </div>
                        <div className="mt-8 space-y-4">
                            {pages(router).map((page, index) => (
                                <Link
                                    href={page.link}
                                    key={index}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 text-xl transition-all duration-200 ${page.active ? 'bg-gray-500/5 text-black dark:text-white font-semibold' : 'hover:bg-gray-500/10 text-zinc-400 hover:text-black hover:dark:text-white'} px-4 py-3 rounded-lg`}
                                >
                                    <i className={`${page.active ? page.icon.active : page.icon.default} w-6`} />
                                    <p>{page.label}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </TransitionChild>
            </Transition>*/}
        </>
    );
}
