/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type Theme = typeof Colors.light;
type ColorName = keyof Theme;

export function useThemeColor<T extends ColorName>(colorName: T): Theme[T] {
  const theme = useColorScheme() ?? "light";

  // @ts-ignore TODO [tech_low] need fix
  return Colors[theme][colorName];
}
