import React from "react";
import { KeyProps } from "@/interfaces";

export default function KeyShortcut({ keys, ...extraAttributes }: KeyProps) {
    const keyElements = keys.reduce<React.ReactNode[]>((acc, key, idx) => {
        if (idx > 0) acc.push(<span key={`separator-${idx}`}>+</span>);
        acc.push(<span key={`key-${idx}`}>{key}</span>);
        return acc;
    }, []);

    return (
        <div
            className="rounded-lg px-2 py-1 bg-gray-600/5 text-zinc-400 flex gap-2 items-center justify-center text-xs transition-colors duration-200"
            {...extraAttributes}
        >
            {keyElements}
        </div>
    );
}
