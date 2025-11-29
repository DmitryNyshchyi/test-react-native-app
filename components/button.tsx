import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "@/components/themed-text";

type Props = ViewProps &
  PressableProps & {
    variant?: "primary" | "secondary" | "fab";
  };

export function Button({
  children,
  style,
  variant = "primary",
  ...props
}: Props) {
  const buttonTheme = useThemeColor(
    variant === "secondary" ? "secondaryButton" : "primaryButton",
  );

  const buttonStyles = [
    styles.baseButton,
    variant === "fab" ? styles.fabButton : styles.fullWidthButton,
    { backgroundColor: buttonTheme?.backgroundColor },
  ];

  const textStyles = [
    styles.text,
    { color: buttonTheme?.textColor },
    variant === "fab" && styles.fabText,
  ];

  return (
    <Pressable style={style} {...props}>
      <View style={buttonStyles}>
        <ThemedText style={textStyles}>{children}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  fullWidthButton: {
    padding: 8,
    width: "100%",
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28, // half of width/height
    elevation: 8, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "600",
  },
  fabText: {
    fontSize: 24,
    lineHeight: 30,
    textTransform: "none",
  },
});
