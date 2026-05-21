"use client";
import { OpenLibraryBook } from "@/types/open-library";
import { OpenLibrary } from "app/clients/open-library-client";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookCardLoading from "./BookCardLoading";
import { responsive } from "app/definitions/ResponsiveBreakpoints";

export default function TrendingBooks() {
  const [booksToShow, setBooksToShow] = useState<Array<OpenLibraryBook>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrendingBooks = async () => {
    try {
      const trendingData = await OpenLibrary.getTrendingBooks();
      const { works } = trendingData;
      setBooksToShow(works.slice(0, 40));
    } catch (e) {
      console.error("Failed to fetch trending books:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  return (
    <div className="pt-[20px]">
      <div className="text-3xl font-display font-semibold pb-4 text-text-primary section-title">
        Trending Books
      </div>
      <div className="p-4 bg-primary-burgundy rounded-2xl shadow-card mt-4">
        {loading ? (
          <BookCardLoading />
        ) : error ? (
          <p className="text-white text-center py-4">Unable to load trending books. Please try again later.</p>
        ) : (
          <Carousel responsive={responsive}>
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
                  url={"/?"}
                  type={"light"}
                />
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}
