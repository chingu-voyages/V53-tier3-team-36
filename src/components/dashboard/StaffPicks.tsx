"use client";
import { BookData } from "@/types/open-library";
import { OpenLibrary } from "app/clients/open-library-client";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StaffPickBook from "./StaffPickBook";

export default function StaffPicks() {
  const [booksToShow, setBooksToShow] = useState<Array<BookData>>([]);
  const [loading, setLoading] = useState(true);
  const staffPickIds: Array<string> = [
    "/works/OL134601W",
    "/works/OL27482W",
    "/works/OL893415W",
    "/works/OL10834W",
    "/works/OL35392322W",
    "/works/OL85892W",
    "/works/OL1063588W",
    "/works/OL28736183W",
    "/works/OL3511459W",
    "/works/OL1911334W",
  ];
  const fetchStaffPicks = async () => {
    const bookResults = staffPickIds.map(async (id) => {
      const someAsyncValue = await OpenLibrary.getBookById(id);
      return someAsyncValue;
    });
    const staffPickBooks = await Promise.all(bookResults);
    setBooksToShow(staffPickBooks);
    setLoading(false);
  };

  useEffect(() => {
    fetchStaffPicks();
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
    <div className="pt-[90px]">
      <div className="text-black text-3xl font-lumiFontLato pb-3">
        Weekly Staff Picks
      </div>
      <div className="p-2">
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
          </div>
        ) : (
          <Carousel responsive={responsive}>
            {booksToShow.map((book: BookData, i: number) => {
              return (
                <StaffPickBook
                  id={book!.key}
                  key={book!.key}
                  url={"/?"}
                  order={i + 1}
                />
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}
