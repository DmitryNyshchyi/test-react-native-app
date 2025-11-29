import { FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Book } from "@/types/book";
import { ShortBookCard } from "@/components/short-book-card";

type BooksGridProps = {
  books: Book[];
  onDelete: (id: string) => void;
};

export function BooksGrid({ books, onDelete }: BooksGridProps) {
  const router = useRouter();

  const handlePressBook = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePressBook(item.id)}>
          <ShortBookCard {...item} onDelete={onDelete} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={{ gap: 12 }}
    />
  );
}
