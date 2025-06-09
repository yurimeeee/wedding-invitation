// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        textDark: '#261C1D',
        textDefault: '#2D2D2D',

        // 라이트 베이지 계열
        lightBeige100: '#FCFDF8',
        lightBeige200: '#FCF9F0',
        lightBeige300: '#F8F4EB',

        // 라이트 그레이 계열
        lightGrey100: '#F3F2EE',
        lightGrey200: '#EDEDED',
        lightGrey300: '#E3E2E0',

        // 베이지 계열
        beige100: '#E1DBD5',
        beige200: '#DDD2C8',

        // 기타 단일 색상
        brown100: '#837E80',
        mint100: '#DFE9E1',

        // 핑크 계열
        pink100: '#F7ECE8',
        pink200: '#F7ECE8',
        pink300: '#F0DFD8',
        pink400: '#f7dee2',
        pink500: '#f3d5d9',
        pink600: '#cb949a',
        darkPink100: '#CC9399',

        // 레드
        red: '#9C0000',

        gray50: '#FAFAFA',
        gray100: '#F5F5F5',
        gray200: '#EEEEEE',
        gray300: '#E0E0E0',
        gray400: '#BDBDBD',
        gray500: '#9E9E9E',
        gray600: '#757575',
        gray700: '#616161',
        gray800: '#424242',
        gray900: '#212121',

        // 기본 블랙 & 화이트
        black: '#000000',
        white: '#FFFFFF',

        // PRIMARY 계열 (스케일로 정의)
        primary: {
          400: '#7F7CFF',
          450: '#6C62DF',
          500: '#6558FF',
          600: '#532CFF',
          700: '#3F1DD1',
          800: '#341AA6',
          900: '#291778',
        },
      },
      fontFamily: {
        suit: ['var(--font-suit)', 'sans-serif'],
      },
      boxShadow: {
        default: '0 2px 4px -2px rgb(0 0 0 / 0.1)', // 여기서 변수 사용도 가능
      },
    },
  },
  plugins: [],
};

export default config;
