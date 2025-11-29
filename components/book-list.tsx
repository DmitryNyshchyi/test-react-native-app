import { View, ActivityIndicator, StyleSheet } from "react-native";

import { Book } from "@/types/book";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { Button } from "./button";
import { BooksGrid } from "./books-grid";

type BookListProps = {
  loading: boolean;
  error: string | null;
  books: Book[];
  onDelete: (id: string) => void;
  onAdd: () => void;
  onRetry: () => void;
};

export function BookList({
  loading,
  error,
  books,
  onDelete,
  onAdd,
  onRetry,
}: BookListProps) {
  const activityIndicatorColor = useThemeColor("tint");

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={activityIndicatorColor} />
      </View>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText
          type="default"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </ThemedText>

        <Button onPress={onRetry} variant="primary" style={{ width: "50%" }}>
          Retry
        </Button>
      </ThemedView>
    );
  }

  if (books.length > 0) {
    return <BooksGrid books={books} onDelete={onDelete} />;
  }

  return (
    <ThemedView style={styles.noContentContainer}>
      <ThemedText type="default" style={{ textAlign: "center" }}>
        You have no books read yet
      </ThemedText>
      <Button style={{ width: "50%" }} onPress={onAdd} variant="primary">
        Create
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  noContentContainer: {
    gap: 12,
    marginVertical: 32,
    alignItems: "center",
  },
});
