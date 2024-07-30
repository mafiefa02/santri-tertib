import type { Config } from 'tailwindcss';

import { mantineTailwind } from './tailwind.mantine.preset';

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [mantineTailwind],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
      },
      screens: {
        xl: '1408px', // 88em
      },
    },
    extend: {},
  },
  plugins: [],
};
export default config;
