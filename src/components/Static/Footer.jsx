import { useRouter } from "next/router"
import Link from "next/link";
import { useState } from "react";
import k4itrunConfig from "../../../k4itrun.config";

const Footer = ({ better }) => {
  let [heartColor, setHeartColor] = useState('#f363ac');

  function randomColor() {
    let color = '#';
    let letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  return (
    <>
      <div className="bg-[#04050E] dark:bg-[#090b18] bg-opacity-95 dark:bg-opacity-95 w-full px-6 lg:px-12 py-6">
        <div className="lg:flex justify-between w-full">
          <Link href="/">
            <p className="cursor-pointer flex items-center font-semibold text-2xl">
              <span
                className="bg-[#04050E] dark:bg-[#f363ac] text-xs px-2 py-1 mr-2 rounded-lg">
                v{k4itrunConfig.version} 
              </span>
              {k4itrunConfig.name}
              <span style={{ zIndex: 4 }} className="relative text-cIndigo">
                <i onClick={() => { setHeartColor(randomColor()) }} style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}>.</i>
              </span>
            </p>
          </Link>
          <div className="lg:flex space-x-6 items-center">
            <div className="text-left mt-2 lg:mt-0 lg:text-right">
              <p>
                {k4itrunConfig.name} &copy; 2020 - {new Date().getFullYear()}, All rights
                reserved.
              </p>

              <p>
                Developed with <i onClick={() => { setHeartColor(randomColor()) }} className="fas fa-heart" style={{ color: heartColor, cursor: 'pointer' }} /> by {k4itrunConfig.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;