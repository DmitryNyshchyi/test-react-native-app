import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PortalHost, PortalProvider } from "@gorhom/portal";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { PortalizedToast } from "@/components/portalized-toast";

export const unstable_settings = {
  anchor: "(tabs)",
};

export const ROOT_PORTAL = "root-portal";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PortalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerBackTitle: "All books" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/create-new-book-modal"
            options={{
              presentation: "modal",
              title: "Create new book",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
        <PortalHost name={ROOT_PORTAL} />
      </ThemeProvider>
      <PortalizedToast />
    </PortalProvider>
  );
}
