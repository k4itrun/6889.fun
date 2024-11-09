import { useEffect, useRef, useState } from "react";
import useMousePosition from "@/lib/useMousePosition";

export default function Cursor() {
    const { x, y, delayX, delayY } = useMousePosition();
    const [isClicking, setIsClicking] = useState(false);
    const mouseRef = useRef<HTMLDivElement | null>(null);
    const dotRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mouseRef.current || !dotRef.current) return;

        const cursor = mouseRef.current;
        const cursorDot = dotRef.current;

        const mouseOut = () => {
            cursor.style.opacity = '0';
        };

        const mouseOver = () => {
            cursor.style.opacity = '1';
        };

        const click = () => {
            setIsClicking(true);
            setTimeout(() => {
                setIsClicking(false);
            }, 100);
        };

        document.addEventListener("mouseout", mouseOut);
        document.addEventListener("mouseover", mouseOver);
        document.addEventListener("click", click);

        return () => {
            document.removeEventListener("mouseout", mouseOut);
            document.removeEventListener("mouseover", mouseOver);
            document.removeEventListener("click", click);
        };
    }, []);

    return <>
        <div
            className={`hidden lg:block fixed ring-2 ring-primary rounded-full w-10 h-10 bg-white/50 dark:bg-black/50 pointer-events-none`}
            style={{
                left: (delayX ?? 0) - 16,
                top: (delayY ?? 0) - 16,
                zIndex: 9999999999999,
                transition: 'opacity 0.1s ease-in-out',
                opacity: 0,
            }}
            ref={mouseRef}
        >
            <div className="w-full h-full flex justify-center items-center">
                <div
                    className="bg-primary rounded-full w-2 h-2 fixed pointer-events-none"
                    style={{
                        left: x ?? 0,
                        top: y ?? 0,
                    }}
                    ref={dotRef}
                />
            </div>
        </div>
    </>;
};
