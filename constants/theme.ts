/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const primary = "#614385";
const primaryAlt = "#516395";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary,
    primaryAlt,
    background: "#FFFFFF",
    card: "#F2F2F6",
    text: "#1B1D21",
    textSecondary: "#6C6E75",
    border: "#D8D9DE",
    shadow: "#00000022",
    gradient: ["#614385", "#516395"],

    primaryButton: {
      backgroundColor: primary,
      textColor: "#F2F2F6",
    },

    secondaryButton: {
      backgroundColor: "#51639533",
      textColor: primaryAlt,
    },

    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary,
    primaryAlt,
    background: "#0E0F12",
    card: "#1A1C20",
    text: "#F2F2F5",
    textSecondary: "#A5A7AF",
    border: "#282A2F",
    shadow: "#000000",
    gradient: ["#614385", "#516395"],

    primaryButton: {
      backgroundColor: primary,
      textColor: "#F2F2F6",
    },

    secondaryButton: {
      backgroundColor: "#51639533",
      textColor: primaryAlt,
    },

    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
