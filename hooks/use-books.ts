import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { ref, push, set, onValue, remove, get, child } from "firebase/database";
import Toast from "react-native-toast-message";

import { Book } from "@/types/book";
import { db } from "@/firebaseConfig";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const booksRef = ref(db, "books");

  const loadBooks = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  useEffect(() => {
    const unsubscribe = onValue(
      booksRef,
      (snapshot) => {
        setLoading(true);

        const data = snapshot.val();
        const loadedBooks: Book[] = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];

        setBooks(loadedBooks);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Firebase Realtime Database error:", error);
        setError("Failed to load books from the database. Please try again.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const getBookById = useCallback(
    async (id: string): Promise<Book | null> => {
      setLoading(true);

      try {
        const snapshot = await get(child(booksRef, id));

        if (snapshot.exists()) {
          return { id: snapshot.key as string, ...snapshot.val() };
        }

        return null;
      } catch (error) {
        console.error("Firebase Realtime Database error:", error);
        setError("Failed to load book details.");

        return null;
      } finally {
        setLoading(false);
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

      setIsMutating(true);

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
        setError("Failed to save the book.");

        return false;
      } finally {
        setIsMutating(false);
      }
    },
    [booksRef],
  );

  const deleteBook = useCallback(
    (id: string, onSuccess?: () => void) => {
      const onDelete = async () => {
        setIsMutating(true);

        try {
          await remove(child(booksRef, id));
          Toast.show({
            type: "success",
            text1: "Success: Book deleted successfully!",
          });
          onSuccess?.();
        } catch (e) {
          console.error("Firebase Realtime Database error:", e);
          setError("Failed to delete the book.");
        } finally {
          setIsMutating(false);
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
      setIsMutating(true);

      try {
        await set(child(booksRef, bookId), updatedData);
        Toast.show({
          type: "success",
          text1: "Success: Book updated successfully!",
        });

        return true;
      } catch (e) {
        console.error("Firebase Realtime Database error:", e);
        setError("ailed to update the book.");
      } finally {
        setIsMutating(false);
      }
    },
    [booksRef],
  );

  return {
    books,
    loading,
    isMutating,
    error,
    loadBooks,
    addBook,
    deleteBook,
    getBookById,
    updateBook,
  };
}
