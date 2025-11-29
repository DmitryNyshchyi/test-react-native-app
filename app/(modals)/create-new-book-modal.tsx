import { useRouter } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/button";
import { Rating } from "@/components/rating";
import { Book } from "@/types/book";
import { useBooks } from "@/hooks/use-books";

export default function ModalScreen() {
  const { back } = useRouter();
  const { addBook, isMutating } = useBooks();
  const [form, setForm] = useState<Omit<Book, "id">>({
    name: "",
    author: "",
    rating: 0,
    description: "",
  });

  const handleCreate = async () => {
    if (await addBook(form)) back();
  };

  const updateFormField =
    <K extends keyof typeof form>(key: K) =>
    (value: (typeof form)[K]) => {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
    };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create new book</ThemedText>

      <TextInput
        value={form.name}
        onChangeText={updateFormField("name")}
        style={styles.textInput}
        placeholder="Book name"
        placeholderTextColor="#888"
      />

      <TextInput
        value={form.author}
        onChangeText={updateFormField("author")}
        style={styles.textInput}
        placeholder="Author"
        placeholderTextColor="#888"
      />

      <Rating rating={form.rating} onRatingChange={updateFormField("rating")} />

      <TextInput
        value={form.description}
        onChangeText={updateFormField("description")}
        style={[styles.textInput, styles.descriptionInput]}
        placeholder="Leave an impression about the book"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />

      <ThemedView style={styles.buttonsContainer}>
        <Button
          style={{ flex: 1 }}
          onPress={back}
          variant="secondary"
          disabled={isMutating}
        >
          Cancel
        </Button>

        <Button
          style={{ flex: 1 }}
          onPress={handleCreate}
          variant="primary"
          disabled={isMutating}
          loading={isMutating}
        >
          Create
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    color: "black",
    borderRadius: 5,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
