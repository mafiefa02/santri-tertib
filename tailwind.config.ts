import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true,
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: 'var(--mantine-primary-color-0)',
          100: 'var(--mantine-primary-color-1)',
          200: 'var(--mantine-primary-color-2)',
          300: 'var(--mantine-primary-color-3)',
          400: 'var(--mantine-primary-color-4)',
          500: 'var(--mantine-primary-color-5)',
          600: 'var(--mantine-primary-color-6)',
          700: 'var(--mantine-primary-color-7)',
          800: 'var(--mantine-primary-color-8)',
          900: 'var(--mantine-primary-color-9)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
