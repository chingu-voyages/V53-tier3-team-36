"use client";
import { OpenLibraryBook } from "@/types/open-library";
import { OpenLibrary } from "app/clients/open-library-client";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function TrendingBooks() {
  const [booksToShow, setBooksToShow] = useState<Array<OpenLibraryBook>>([]);

  const fetchTrendingBooks = async () => {
    const trendingData = await OpenLibrary.getTrendingBooks();
    const { works } = trendingData;
    setBooksToShow(works.slice(0, 20));
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  return (
    <div>
      <span className="font-bold text-3xl">Trending Books</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {booksToShow.map((book: OpenLibraryBook) => {
          const author = Array.isArray(book.author_name)
            ? book.author_name[0]
            : book.author_name;
          return (
            <BookCard
              title={book.title}
              author={author}
              id={book.key}
              key={book.key}
            />
          );
        })}
      </div>
    </div>
  );
}
