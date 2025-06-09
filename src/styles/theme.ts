//theme.ts
declare module "@emotion/react" {
  export interface DefaultTheme {
    fontSize: {
      xxs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
    };
    color: {
      textDark: string,
      textDefault: string,
      lightBeige100: string,
      lightBeige200: string,
      lightBeige300: string,
      lightGrey100: string,
      lightGrey200: string,
      lightGrey300: string,
      beige100: string,
      beige200: string,
      brown100: string,
      mint100: string,
      pink100: string,
      pink200: string,
      pink300: string,
      pink400: string,
      pink500: string,
      darkPink100: string,
      red: string,
      gray_50: string;
      gray_100: string;
      gray_200: string;
      gray_300: string;
      gray_400: string;
      gray_500: string;
      gray_600: string;
      gray_700: string;
      gray_800: string;
      gray_900: string;
      black: string;
      white: string;
    };
  }
}

// const theme: DefaultTheme = {
export const theme = {
  fontSize: {
    fs11: "11px",
    fs12: "12px",
    fs14: "14px",
    fs16: "16px",
    fs18: "18px",
    fs20: "20px",
    fs24: "24px",
    fs32: "32px",
  },
  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed1: "1.75",
    relaxed2: "2",
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide1: "0.05em",
    wide2: "0.15em",
  },
  color: {
    textDark: '#261C1D',
    textDefault: '#2D2D2D',
    lightBeige100: '#FCFDF8',
    lightBeige200: '#FCF9F0',
    lightBeige300: '#F8F4EB',
    lightGrey100: '#F3F2EE',
    lightGrey200: '#EDEDED',
    lightGrey300: '#E3E2E0',
    beige100: '#E1DBD5',
    beige200: '#DDD2C8',
    brown100: '#837E80',
    mint100: '#DFE9E1',
    pink100: '#F7ECE8',
    pink200: '#F7ECE8',
    pink300: '#F0DFD8',
    pink400: '#f7dee2',
    pink500: '#f3d5d9',
    pink600: '#cb949a',
    darkPink100: '#CC9399',
    red: '#9C0000',
    gray_50: "#FAFAFA",
    gray_100: "#F5F5F5",
    gray_200: "#EEEEEE",
    gray_300: "#E0E0E0",
    gray_400: "#BDBDBD",
    gray_500: "#9E9E9E",
    gray_600: "#757575",
    gray_700: "#616161",
    gray_800: "#424242",
    gray_900: "#212121",
    black: "#000000",
    white: "#FFFFFF",
  },
};

export type AppTheme = typeof theme;
export default theme;