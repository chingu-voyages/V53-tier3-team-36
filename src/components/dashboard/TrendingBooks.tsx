"use client";
import { OpenLibraryBook } from "@/types/open-library";
import { OpenLibrary } from "app/clients/open-library-client";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TrendingBooks() {
  const [booksToShow, setBooksToShow] = useState<Array<OpenLibraryBook>>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingBooks = async () => {
    const trendingData = await OpenLibrary.getTrendingBooks();
    const { works } = trendingData;
    setBooksToShow(works.slice(0, 40));
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="pt-[60px]">
      <div className="text-3xl font-lumiFontLato pb-3 text-black">
        Trending Books
      </div>
      <div className="p-2 bg-foreground rounded-[12px] shadow-md">
        {loading ? (
          <div
            style={{
              display: "flex",
              width: "170px",
              height: "315px",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <Skeleton
              containerClassName="flex-1 w-[170px] h-[240px]"
              height={240}
            />
            <Skeleton width={120} height={10} />
            <Skeleton width={100} height={10} />
          </div>
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
