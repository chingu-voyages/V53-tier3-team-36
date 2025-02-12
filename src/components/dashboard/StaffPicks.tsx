"use client";
import { BookData } from "@/types/open-library";
import { OpenLibrary } from "app/clients/open-library-client";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StaffPickBook from "./StaffPickBook";
import { responsive } from "app/definitions/ResponsiveBreakpoints";

export default function StaffPicks() {
  const [booksToShow, setBooksToShow] = useState<Array<BookData>>([]);
  const [loading, setLoading] = useState(true);
  const staffPickIds: Array<string> = [
    "/works/OL15829966W",
    "/works/OL134601W",
    "/works/OL21009648W",
    "/works/OL20203688W",
    "/works/OL10834W",
    "/works/OL21357519W",
    "/works/OL1911334W",
    "/works/OL10343120W",
    "/works/OL28736183W",
    "/works/OL26841047W",
    "/works/OL95178W",
    "/works/OL3511459W",
    "/works/OL24600223W",
    // "/works/OL37478443W",
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
