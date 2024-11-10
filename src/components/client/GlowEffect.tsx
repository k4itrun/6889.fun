"use client";

import { GlowEffectProps } from "@/interfaces";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

export default function GlowEffect({ children, className }: GlowEffectProps) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const glowSetting = localStorage.getItem("glow");
    setEnabled(glowSetting === "true");

    if (!glowSetting) {
      localStorage.setItem("glow", "true");
    }

    const handleGlowEffect = () => {
      setEnabled(localStorage.getItem("glow") === "true");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    mediaQuery.addEventListener("change", (e) => setIsDarkMode(e.matches));

    window.addEventListener("glowEffect", handleGlowEffect);

    return () => {
      window.removeEventListener("glowEffect", handleGlowEffect);
      mediaQuery.removeEventListener("change", (e) => setIsDarkMode(e.matches));
    };
  }, []);

  if (!enabled) return (<>{children}</>);

  return (
    <>
      <Tilt
        glareEnable={enabled}
        glareMaxOpacity={isDarkMode ? 0.2 : 0.1}
        glareColor={isDarkMode ? "#ffffff" : "#000000"}
        glarePosition="all"
        glareBorderRadius="8px"
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        className={className}
      >
        {children}
      </Tilt>
    </>
  );
}
