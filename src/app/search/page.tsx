"use client";

import { useSearchParams } from "next/navigation";
import { OpenLibraryBook } from "@/types/open-library";
import { useState, useEffect } from "react";
import { OpenLibrary } from "app/clients/open-library-client";
import BookCard from "components/dashboard/BookCard";
import BookCardLoading from "@/components/dashboard/BookCardLoading";

export default function Search() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("title");
  const categoryTerm = searchParams.get("category");

  const [books, setBooks] = useState<OpenLibraryBook[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchBooks = async () => {
      if (categoryTerm) {
        const bookList = await OpenLibrary.getBooksBySubjectSearch(
          categoryTerm as string
        );
        const { works } = bookList;
        const booksToShow = works.slice(0, 20);
        setBooks(booksToShow);
      } else {
        const bookList = await OpenLibrary.getBooksBySearch(
          searchTerm as string
        );
        const { docs } = bookList;
        const booksToShow = docs.slice(0, 20);
        setBooks(booksToShow);
      }
      setLoading(false);
    };

    getSearchBooks();
  }, [searchTerm, categoryTerm]);

  return (
    <div className="w-full py-6">
      {loading ? (
        <BookCardLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
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
                type={"dark"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
