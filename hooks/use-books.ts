import { useState, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Book } from "@/types/book";

const BOOKS_STORAGE_KEY = "@books_list";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  const loadBooks = useCallback(async () => {
    try {
      const booksJson = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);

      setBooks(booksJson ? JSON.parse(booksJson) : []);
    } catch (e) {
      Alert.alert("Error", "Failed to load books.");
    }
  }, []);

  const getBookById = async (id: string): Promise<Book | null> => {
    try {
      const booksJson = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);

      if (booksJson) {
        const allBooks: Book[] = JSON.parse(booksJson);

        return allBooks.find((b) => b.id === id) || null;
      }

      return null;
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
      const currentBooksJson = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);
      const currentBooks: Book[] = currentBooksJson
        ? JSON.parse(currentBooksJson)
        : [];

      const newBook: Book = { ...bookData, id: Date.now().toString() };
      const updatedBooks = [...currentBooks, newBook];

      await AsyncStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));

      return true;
    } catch (e) {
      Alert.alert("Error", "Failed to save the book.");

      return false;
    }
  };

  const deleteBook = (id: string, onSuccess?: () => void) => {
    const onDelete = async () => {
      try {
        const updatedBooks = books.filter((book) => book.id !== id);

        await AsyncStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
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
