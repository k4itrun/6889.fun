import { EventActions, ContextMenuProps, ItemProps } from "@/interfaces";

import { useEffect, useState } from "react";
import Key from "./Key";

const ContextMenu = ({ content, children }: ContextMenuProps) => {
    const [hasBack, setHasBack] = useState<boolean>(false);
    const [hasForward, setHasForward] = useState<boolean>(false);

    useEffect(() => {
        const contextListener = (e: MouseEvent) => {
            e.preventDefault();
            const menu = document.querySelector(".context-menu") as HTMLElement;
            const menuPosition = { x: e.pageX, y: e.pageY };
            const windowSize = { width: window.innerWidth, height: window.innerHeight };

            if (menu && windowSize.width - menuPosition.x < menu.offsetWidth) {
                menu.style.left = `${windowSize.width - menu.offsetWidth - 24}px`;
            } else if (menu) {
                menu.style.left = `${menuPosition.x}px`;
            }

            if (menu) {
                menu.style.top = `${menuPosition.y}px`;
                menu.style.display = "block";
            }
        };

        const clickListener = () => {
            const content = document.querySelector(".context-menu") as HTMLElement;
            if (content) content.style.display = "none";
        };

        document.addEventListener("contextmenu", contextListener);
        document.addEventListener("click", clickListener);

        return () => {
            document.removeEventListener("contextmenu", contextListener);
            document.removeEventListener("click", clickListener);
        };
    }, [content]);

    useEffect(() => {
        setHasBack(window.history.length > 1);
        setHasForward(window.history.length > 1);
    }, []);

    const event: EventActions = {
        hasForward,
        hasBack,
        goBack: () => window.history.back(),
        goForward: () => window.history.forward(),
        refreshPage: () => window.location.reload(),
        viewGithub: () => window.open("https://github.com/k4itrun/", "_blank"),
        viewYoutube: () => window.open("https://youtube.com/channel/UCa6sR_p87T0kB4FdvOJiVjw", "_blank"),
    };

    return (
        <>
            <div
                style={{
                    zIndex: 9999999,
                    display: "none",
                }}
                className="context-menu absolute bg-[#04050E] dark:bg-[#090b18] rounded-lg shadow-xl py-2 w-72 divide-y divide-gray-600/10 space-y-2"
            >
                {content(event)}
            </div>

            {children}
        </>
    );
};

export default ContextMenu;

export const Item = ({ icon, text, kbd, onClick, ...props }: ItemProps) => {
    return (
        <div onClick={onClick} className="flex flex-col text-sm" {...props}>
            <div className="flex gap-2 w-full justify-between items-center hover:bg-gray-600/5 p-2 px-4 transition-all duration-200">
                <div className="flex items-center gap-2">
                    {icon}
                    <p className="text-sm">{text}</p>
                </div>
                {kbd && <Key keys={kbd} />}
            </div>
        </div>
    );
};
