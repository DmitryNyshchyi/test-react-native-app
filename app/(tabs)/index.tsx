import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/button";
import { BooksGrid } from "@/components/books-grid";
import { useBooks } from "@/hooks/use-books";

export default function HomeScreen() {
  const { push } = useRouter();
  const { books, loadBooks, deleteBook } = useBooks();

  useFocusEffect(
    useCallback(() => {
      void loadBooks();
    }, [loadBooks]),
  );

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/header-books.png")}
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Your list of books read</ThemedText>
        </ThemedView>

        {books?.length > 0 ? (
          <BooksGrid books={books} onDelete={deleteBook} />
        ) : (
          <ThemedView style={styles.noContentContainer}>
            <ThemedText type="default" style={{ textAlign: "center" }}>
              You have no books read yet
            </ThemedText>
            <Button
              style={{ width: "50%" }}
              onPress={() => push("/(modals)/create-new-book-modal")}
              variant="primary"
            >
              Create
            </Button>
          </ThemedView>
        )}
      </ParallaxScrollView>

      {books?.length > 0 && (
        <Button
          style={styles.fab}
          onPress={() => push("/(modals)/create-new-book-modal")}
          variant="fab"
        >
          +
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  noContentContainer: {
    gap: 12,
    marginVertical: 32,
    alignItems: "center",
  },
  headerImage: {
    height: "100%",
    width: "100%",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
