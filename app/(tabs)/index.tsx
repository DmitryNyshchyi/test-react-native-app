import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/button";
import { useBooks } from "@/hooks/use-books";
import { BookList } from "@/components/book-list";

export default function HomeScreen() {
  const { push } = useRouter();
  const { books, loading, error, loadBooks, deleteBook } = useBooks();

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

        <BookList
          loading={loading}
          error={error}
          books={books}
          onDelete={deleteBook}
          onAdd={() => push("/(modals)/create-new-book-modal")}
          onRetry={loadBooks}
        />
      </ParallaxScrollView>

      {!loading && books?.length > 0 && (
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
  headerImage: {
    width: "100%",
    height: "100%",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
