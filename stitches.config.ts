import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, getCssText, theme } =
  createStitches({
    theme: {
      shadows: {
        dropdown: "0 0 15px 1px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        primary: "#17234D",
        secondary: "#1B7DA8",
        accent: "#027FFF",
        disabled: "#d4d4d8",
        grey: "#9CA3AF",
        black: "#000000",
        white: "#ffffff",
        red: "#ef4444",
        green: "#22c55e",
        blue: "#0ea5e9",
        yellow: "#eab308",
        orange: "#f97316",
        rgbAccent: "2, 127, 255",
        rgbPrimary: "23, 35, 77",
        rgbSecondary: "27, 125, 168",
        rgbRed: "239, 68, 68",
        rgbGreen: "34, 197, 94",
      },
      fontSizes: {
        xs: "0.75em", // 12px
        sm: "0.875em", // 14px
        base: "1em", // 16px
        lg: "1.25em", // 20px
        xl: "1.5em", // 24px
        "2xl": "2em", // 32px
        "3xl": "3em", // 48px
      },
      fontWeights: {
        400: 400,
        500: 500,
        600: 600,
        700: 700,
      },
      lineHeights: {
        base: "23px",
        "2xl": "32px",
        "3xl": "48px",
      },
    },
    media: {
      xs: "(min-width: 420px)",
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      xl: "(min-width: 1280px)",
      "2xl": "(min-width: 1536px)",
    },
  });
