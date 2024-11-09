import { KeyProps } from "@/interfaces";

import React from "react";

export default function Key({ keys, ...props }: KeyProps) {
    return (
        <>
            <div className="bg-gray-600/5 text-zinc-400 transition-all px-2 py-1 flex items-center justify-center duration-200 gap-2 rounded-lg text-xs">
                {keys.map((keya, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <span key={`plus-${index}`}>+</span>}
                        <span {...props}>{keya}</span>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};