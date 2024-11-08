"use client";

import { GlowEffectProps } from "@/interfaces";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

export function GlowEffect({ children, className }: GlowEffectProps) {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    const glowSetting = localStorage.getItem("glow");
    setEnabled(glowSetting === "true");

    if (!glowSetting) {
      localStorage.setItem("glow", "true");
    }

    const handleGlowEffect = () => {
      setEnabled(localStorage.getItem("glow") === "true");
    };

    window.addEventListener("glowEffect", handleGlowEffect);

    return () => {
      window.removeEventListener("glowEffect", handleGlowEffect);
    };
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <Tilt
      glareEnable={enabled}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      className={className}
    >
      {children}
    </Tilt>
  );
}
