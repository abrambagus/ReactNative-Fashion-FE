import { createBox, createText, createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    primary: "#2CB9B0",
    secondary: "#0C0D34",
    white: "white",
    text: "rgba(12,13,52,0.7)",
    grey: "rgba(12, 13, 52, 0.05)",
    transparent: "transparent",
    danger: "#FF0058",
  },
  spacing: {
    n: 0,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 106,
  },

  borderRadii: {
    n: 0,
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },

  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
      textAlign: "center",
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
