import {metaConfig} from './k4itrun.config'

import tailwindTypography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./k4itrun.config.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...metaConfig.tailwindColors
      }
    },
  },
  plugins: [tailwindTypography]
}
