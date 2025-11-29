import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";

type RatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  color?: string;
};

export function Rating({
  rating,
  onRatingChange,
  size = 32,
  color = "#FFD700",
}: RatingProps) {
  const [currentRating, setCurrentRating] = useState(rating);

  const isWriteMode = !!onRatingChange;

  const handlePress = (rate: number) => {
    if (isWriteMode) {
      setCurrentRating(rate);
      onRatingChange(rate);
    }
  };

  return (
    <View style={styles.container}>
      {isWriteMode && <ThemedText type="default">Rate</ThemedText>}

      <View style={styles.rateContainer}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <Pressable key={rate} onPress={() => handlePress(rate)}>
            <MaterialIcons
              name={rate <= currentRating ? "star" : "star-border"}
              size={size}
              color={color}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
