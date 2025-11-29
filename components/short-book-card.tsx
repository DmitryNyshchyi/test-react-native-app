import { StyleSheet, View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Book } from "@/types/book";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Rating } from "@/components/rating";

type ShortBookCardProps = Book & {
  onDelete: (id: string) => void;
};

export function ShortBookCard({ onDelete, ...props }: ShortBookCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">{props?.name}</ThemedText>
        <Pressable
          onPress={() => onDelete(props.id)}
          style={styles.deleteButton}
        >
          <MaterialIcons name="delete" size={24} color="#E53935" />
        </Pressable>
      </View>
      <ThemedText>by {props?.author}</ThemedText>
      <Rating rating={props?.rating} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    padding: 4,
  },
});
