import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Book } from "@/types/book";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Rating } from "@/components/rating";
import { useBooks } from "@/hooks/use-books";

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {back} = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const { getBookById, deleteBook } = useBooks();

  useEffect(() => {
    (async () => {
      if (id) {
        setBook(await getBookById(id));
      }
    })();
  }, [id, getBookById]);

  const handleDelete = () => {
    if (id) {
      deleteBook(id, back);
    }
  };

  if (!book) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: book.name,
          headerRight: () => (
            <Pressable onPress={handleDelete} style={{ padding: 4 }}>
              <MaterialIcons name="delete" size={24} color="#E53935" />
            </Pressable>
          ),
        }}
      />
      <ThemedText type="title">{book.name}</ThemedText>
      <ThemedText type="subtitle">by {book.author}</ThemedText>
      <Rating rating={book.rating} onRatingChange={() => {}} />
      <ThemedText style={styles.description}>{book.description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});
