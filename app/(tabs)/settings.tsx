import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import { ThemedText } from "@/components/themed-text";
import ParallaxScrollView from "@/components/parallax-scroll-view";

export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/header-settings.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedText type="title">Settings page</ThemedText>
      <ThemedText>Need implement changing theme</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
