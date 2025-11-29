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

  const loadBooks = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  useEffect(() => {
    try {
      setLoading(true);

      const booksRef = ref(db, "books");

      const unsubscribe = onValue(
        booksRef,
        (snapshot) => {
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
          setError(
            "Failed to load books. Check your connection and database rules.",
          );
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (e: any) {
      console.error("Firebase initialization error:", e.message);
      setError("Firebase is not configured correctly");
      setLoading(false);
    }
  }, []);

  const getBookById = useCallback(async (id: string): Promise<Book | null> => {
    setLoading(true);

    try {
      const booksRef = ref(db, "books");
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
  }, []);

  const addBook = useCallback(async (bookData: Omit<Book, "id">) => {
    if (!bookData.name || !bookData.author || !bookData.rating) {
      Toast.show({
        type: "error",
        text1:
          "Validation Error: Please fill in both book name, author and rating.",
      });

      return false;
    }

    setIsMutating(true);

    try {
      const booksRef = ref(db, "books");
      const newBookRef = push(booksRef);

      await set(newBookRef, bookData);
      Toast.show({ text1: "Success: Book added successfully!" });

      return true;
    } catch (error) {
      console.error("Firebase Realtime Database error:", error);
      setError("Failed to save the book.");

      return false;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const deleteBook = useCallback((id: string, onSuccess?: () => void) => {
    const onDelete = async () => {
      setIsMutating(true);

      try {
        const booksRef = ref(db, "books");

        await remove(child(booksRef, id));
        Toast.show({ text1: "Success: Book deleted successfully!" });
        onSuccess?.();
      } catch (error) {
        console.error("Firebase Realtime Database error:", error);
        setError("Failed to delete the book.");
      } finally {
        setIsMutating(false);
      }
    };

    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  }, []);

  const updateBook = useCallback(
    async (bookId: string, updatedData: Partial<Omit<Book, "id">>) => {
      setIsMutating(true);

      try {
        const booksRef = ref(db, "books");

        await set(child(booksRef, bookId), updatedData);
        Toast.show({ text1: "Success: Book updated successfully!" });

        return true;
      } catch (error) {
        console.error("Firebase Realtime Database error:", error);
        setError("Failed to update the book.");
      } finally {
        setIsMutating(false);
      }
    },
    [],
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
