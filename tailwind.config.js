/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mezz: {
          gold: '#C5A880',
          'gold-light': '#DFC29A',
          'gold-dark': '#9E7D56',
          dark: '#0A0A0B',
          'dark-card': '#141417',
          'dark-border': '#222227',
          gray: '#8E8E93',
          'light-gray': '#E5E5EA',
          cream: '#F7F6F2'
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
