import { useState, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Book } from "@/types/book";

const BOOKS_STORAGE_KEY = "@books_list";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  const updateBooksJSON = async (updatedBooks: Book[]) => await AsyncStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));

  const loadBooksJSON = async () => await AsyncStorage.getItem(BOOKS_STORAGE_KEY);

  const getCurrentBooks = useCallback(async (): Promise<Book[]> => {
    try {
      const currentBooksJson = await loadBooksJSON();

      return currentBooksJson ? JSON.parse(currentBooksJson) : [];
    } catch (e) {
      Alert.alert("Error", "Failed to load books.");

      return []
    }
  }, [])

  const loadBooks = async () => {
    setBooks(await getCurrentBooks());
  }

  const getBookById = async (id: string): Promise<Book | null> => {
    try {
      return (await getCurrentBooks())?.find((b) => b.id === id) || null;
    } catch (e) {
      Alert.alert("Error", "Failed to load book details.");

      return null;
    }
  };

  const addBook = async (bookData: Omit<Book, 'id'>) => {
    if (!bookData.name || !bookData.author) {
      Alert.alert("Error", "Please fill in both book name and author.");

      return false;
    }

    try {
      const currentBooks = await getCurrentBooks()
      const newBook: Book = { ...bookData, id: Date.now().toString() };

      await updateBooksJSON([...currentBooks, newBook]);

      return true;
    } catch (e) {
      Alert.alert("Error", "Failed to save the book.");

      return false;
    }
  };

  const deleteBook = (id: string, onSuccess?: () => void) => {
    const onDelete = async () => {
      try {
        const currentBooks = await getCurrentBooks()
        const updatedBooks = currentBooks.filter((book) => book.id !== id);

        await updateBooksJSON(updatedBooks);
        setBooks(updatedBooks);
        onSuccess?.();
      } catch (e) {
        Alert.alert("Error", "Failed to delete the book.");
      }
    };

    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return { books, loadBooks, getBookById, addBook, deleteBook };
}
