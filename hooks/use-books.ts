import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { ref, push, set, onValue, remove, get, child } from "firebase/database";
import Toast from "react-native-toast-message";

import { Book } from "@/types/book";
import { db } from "@/firebaseConfig";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const booksRef = ref(db, "books");

  useEffect(() => {
    const unsubscribe = onValue(
      booksRef,
      (snapshot) => {
        const data = snapshot.val();
        const loadedBooks: Book[] = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];

        setBooks(loadedBooks);
      },
      (error) => {
        console.error("Firebase Realtime Database error:", error);
        Toast.show({
          type: "error",
          text1: "Error: Failed to load books from database.",
        });
      },
    );

    return () => unsubscribe();
  }, []);

  const getBookById = useCallback(
    async (id: string): Promise<Book | null> => {
      try {
        const snapshot = await get(child(booksRef, id));

        if (snapshot.exists()) {
          return { id: snapshot.key as string, ...snapshot.val() };
        }

        return null;
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Error: Failed to load book details.",
        });

        return null;
      }
    },
    [booksRef],
  );

  const addBook = useCallback(
    async (bookData: Omit<Book, "id">) => {
      if (!bookData.name || !bookData.author) {
        Toast.show({
          type: "error",
          text1: "Validation Error: Please fill in both book name and author.",
        });

        return false;
      }

      try {
        const newBookRef = push(booksRef);

        await set(newBookRef, bookData);
        Toast.show({
          type: "success",
          text1: "Success: Book added successfully!",
        });

        return true;
      } catch (e) {
        console.error("Firebase Realtime Database error:", e);
        Toast.show({
          type: "error",
          text1: "Error: Failed to save the book.",
        });

        return false;
      }
    },
    [booksRef],
  );

  const deleteBook = useCallback(
    (id: string, onSuccess?: () => void) => {
      const onDelete = async () => {
        try {
          await remove(child(booksRef, id));
          Toast.show({
            type: "success",
            text1: "Success: Book deleted successfully!",
          });
          onSuccess?.();
        } catch (e) {
          console.error("Firebase Realtime Database error:", e);
          Toast.show({
            type: "error",
            text1: "Error: Failed to delete the book.",
          });
        }
      };

      Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]);
    },
    [booksRef],
  );

  const updateBook = useCallback(
    async (bookId: string, updatedData: Partial<Omit<Book, "id">>) => {
      try {
        await set(child(booksRef, bookId), updatedData);
        Toast.show({
          type: "success",
          text1: "Success: Book updated successfully!",
        });

        return true;
      } catch (e) {
        console.error("Firebase Realtime Database error:", e);
        Toast.show({
          type: "error",
          text1: "Error: Failed to update the book.",
        });

        return false;
      }
    },
    [booksRef],
  );

  return { books, getBookById, addBook, deleteBook, updateBook };
}
