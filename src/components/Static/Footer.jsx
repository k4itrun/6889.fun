import Button from "components/Global/Button";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react";
import k4itrunConfig from "../../../k4itrun.config";

export default function Footer() {
    const router = useRouter();

    let [heartColor, setHeartColor] = useState('#f363ac');

    function randomColor() {
        let color = '#';
        let letters = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return <>
        <div className="bg-[#191932]/10">
            <div className="max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                <div className="md:flex w-full items-center justify-between">
                    <div>
                    <p className="text-lg text-zinc-400">© 2018 - {new Date().getFullYear()} {k4itrunConfig.name} - Made with <i onClick={() => { setHeartColor(randomColor()) }} className="fas fa-heart" style={{ color: heartColor, cursor: 'pointer' }} /> by {k4itrunConfig.name}.</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                        <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-full md:w-auto rounded-lg bg-[#191932]/20 p-2 px-6 hover:bg-[#191932]/30 shadow-lg shadow-white/0 hover:shadow-3xl hover:shadow-[#191932]/20 transition-all duration-200">
                            <i className="fab fa-discord mr-2" />Contact with Discord
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </>
}