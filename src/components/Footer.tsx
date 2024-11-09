import { FooterProps } from "@/interfaces";
import { metaConfig } from "@k4itrunconfig";

import { useState, useEffect } from "react";
import Link from "next/link";

const randomColor = (): string => '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');

export default function Footer({ better }: FooterProps) {
  const [heartColor, setHeartColor] = useState<string | any>(metaConfig.tailwindColors.primary);

  useEffect(() => {
    setHeartColor(randomColor());
  }, []);

  return (
    <>
      <div className="bg-primary/10 dark:bg-secondary/55 w-full px-6 lg:px-12 py-6">
        <div className="lg:flex justify-between w-full">
          <Link
            href="/"
            className="text-2xl font-bold transition-all duration-200"
          >
            <p className="text-zinc-400 px-2 py-1 rounded-lg flex items-center">
              <span className="bg-primary dark:bg-primary text-xs px-2 py-1 mr-2 rounded-lg">
                v{metaConfig.version}
              </span>
              {metaConfig.name}
              <i
                onClick={() => setHeartColor(randomColor())}
                style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}
              >.</i>
            </p>
          </Link>
          <div className="text-zinc-400 select-none lg:flex items-center space-x-6 mt-2 lg:mt-0">
            <div className="text-left lg:text-right">
              <p>
                {metaConfig.name} &copy; 2020 - {new Date().getFullYear()}, All rights reserved.
              </p>
              <p>
                Develop without{' '}
                <i
                  onClick={() => setHeartColor(randomColor())}
                  className="fas fa-heart"
                  style={{ color: heartColor, cursor: 'pointer' }}
                />{' '}
                by {metaConfig.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
