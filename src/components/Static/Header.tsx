import { Item, NavItem } from "@/interfaces";
import k4itrunConfig from '@k4itrunconfig'

import { useRouter } from 'next/router';
import { useState, useEffect } from "react";

const items: Item[] = [
    { icon: 'fab fa-github', link: 'https://github.com/k4itrun' },
];

const navItems: NavItem[] = [
    { icon: 'fal fa-home', active: 'fa fa-home', label: 'Home', href: '/' },
    { icon: 'fal fa-compass', active: 'fa fa-compass', label: 'Projects', href: '/projects' },
    { icon: 'fal fa-phone', active: 'fa fa-phone', label: 'Contact', href: '/contact' },
];

const Header = () => {
    const router = useRouter();

    const [heartColor, setHeartColor] = useState<string>('#f363ac');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.body.classList.remove('dark');
        }
    }, []);

    function randomColor(): string {
        let color = '#';
        let letters = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return <>
        <div className="w-full border-b-2 border-[#191932]/10 pb-2">
            <div className="flex flex-col md:flex-row w-full items-center md:justify-between">
                <p className="font-semibold font-Poppins text-xl">
                    {k4itrunConfig.name}
                    <i
                        onClick={() => { setHeartColor(randomColor()) }}
                        style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}
                    >.
                    </i>
                </p>
                {
                    <div className="flex items-center space-x-2">
                        {items.map(item => (
                            <a key={item.link} href={item.link} target="_blank" rel="noreferrer" className="flex items-center justify-center hover:bg-neutral-700/20 rounded-xl transition-all duration-150 p-2 px-3">
                                <i className={`${item.icon} text-3xl`} />
                            </a>
                        ))}
                    </div>
                }
            </div>
            {/*<div className="flex justify-center md:justify-start items-center space-x-4 py-2">
                {navItems.map(item => (
                    <Link key={item.label} href={item.href}>
                        <a className={`flex items-center justify-center text-white/50 cursor-pointer hover:text-white/100 rounded-xl transition-all duration-150 ${router.asPath === item.href && 'text-white/100'}`}>
                            <i className={`${router.asPath === item.href ? item.active : item.icon} mr-2`} />{item.label}
                        </a>
                    </Link>
                ))}
            </div>
            <button
                onClick={toggleTheme}
                className="ml-4 p-2 bg-blue-500 text-white rounded-xl transition-all duration-200 hover:bg-blue-700"
            >
                {isDarkMode ? "Switch to Light" : "Switch to Dark"}
            </button>
            */}
        </div>
    </>
}

export default Header;