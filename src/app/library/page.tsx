"use client";
import BookCard from "@/components/dashboard/BookCard";
import { BookData } from "@/types/open-library";
import { BookDataContext } from "app/contexts/BookDataContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext } from "react";
import BookCardLoading from "@/components/dashboard/BookCardLoading";
// Library
export default function Library() {
  const { status } = useSession();

  const { wantToReadList, readList, isLoading } = useContext(BookDataContext);

  if (status === "unauthenticated") {
    return redirect("/");
  }
  return (
    <div>
      <div>
        {/* Want to read section */}
        <h2 className="text-xl font-bold">Want to Read</h2>
        {isLoading ? (
          <BookCardLoading />
        ) : (
          <div className="flex flex-wrap">
            {wantToReadList?.books &&
              wantToReadList?.books.length > 0 &&
              wantToReadList?.books.map((book: BookData) => {
                return (
                  <BookCard
                    key={book!.key}
                    title={book!.title}
                    author={
                      wantToReadList.authorsDictionary[
                        book!.authors[0].author!.key!
                      ]
                    }
                    id={book!.key}
                    url={`/library/?`}
                    type={"dark"}
                  />
                );
              })}
          </div>
        )}
      </div>
      <div className="mt-8 border-t-2 border-gray-200 pt-8">
        <h2 className="text-xl font-bold">Read List</h2>
        {isLoading ? (
          <BookCardLoading />
        ) : (
          <div className="flex flex-wrap">
            {readList?.books &&
              readList?.books.length > 0 &&
              readList?.books.map((book: BookData) => {
                return (
                  <BookCard
                    key={book!.key}
                    title={book!.title}
                    author={
                      readList.authorsDictionary[book!.authors[0].author!.key!]
                    }
                    id={book!.key}
                    url={`/library/?`}
                    type={"dark"}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
