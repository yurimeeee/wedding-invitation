// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textDark: "var(--text-dark)",
        textDefault: "var(--text-default)",
        lightBeige100: "var(--light-beige-100)",
        lightBeige200: "var(--light-beige-200)",
        lightBeige300: "var(--light-beige-300)",
        lightGrey100: "var(--light-grey-100)",
        lightGrey200: "var(--light-grey-200)",
        lightGrey300: "var(--light-grey-300)",
        beige100: "var(--beige-100)",
        beige200: "var(--beige-200)",
        brown100: "var(--brown-100)",
        mint100: "var(--mint-100)",
        pink100: "var(--pink-100)",
        pink200: "var(--pink-200)",
        pink300: "var(--pink-300)",
        darkPink100: "var(--dark-pink-100)",
        red: "var(--red)",
        gray50: "var(--gray-50)",
        gray100: "var(--gray-100)",
        gray200: "var(--gray-200)",
        gray300: "var(--gray-300)",
        gray400: "var(--gray-400)",
        gray500: "var(--gray-500)",
        gray600: "var(--gray-600)",
        gray700: "var(--gray-700)",
        gray800: "var(--gray-800)",
        gray900: "var(--gray-900)",
        black: "var(--black)",
        white: "var(--white)",
      },
    },
  },
  plugins: [],
};

export default config;
