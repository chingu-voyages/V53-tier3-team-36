"use client";

import { useSearchParams } from "next/navigation";
import { OpenLibraryBook } from "@/types/open-library";
import { useState, useEffect } from "react";
import { OpenLibrary } from "app/clients/open-library-client";
import BookCard from "components/dashboard/BookCard";

export default function Search() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("title");

  const [books, setBooks] = useState<OpenLibraryBook[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchBooks = async () => {
      const bookList = await OpenLibrary.getBooksBySearch(searchTerm as string);
      const { docs } = bookList;
      const booksToShow = docs.slice(0, 20);
      setBooks(booksToShow);
      setLoading(false);
    };

    getSearchBooks();
  }, [searchTerm]);

  return (
    <div className="w-full">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books?.map((book: OpenLibraryBook) => {
            const author = Array.isArray(book.author_name)
              ? book.author_name[0]
              : book.author_name;
            return (
              <BookCard
                title={book.title}
                author={author}
                id={book.key}
                key={book.key}
                url={`search?title=${searchTerm}&`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
