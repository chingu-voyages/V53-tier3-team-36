"use client";
import BookCard from "@/components/dashboard/BookCard";
import { BookData } from "@/types/open-library";
import { BookDataContext } from "app/contexts/BookDataContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext } from "react";
import BookCardLoading from "@/components/dashboard/BookCardLoading";
import Link from "next/link";

// Library
export default function Library() {
  const { status } = useSession();

  const { wantToReadList, readList, isLoading } = useContext(BookDataContext);

  if (status === "unauthenticated") {
    return redirect("/");
  }
  return (
    <div className="pt-6 w-full">
      <div>
        {/* Want to read section */}
        <h2 className="text-2xl font-display font-semibold text-text-primary section-title">Want to Read</h2>
        {isLoading ? (
          <BookCardLoading />
        ) : (
          <div className="flex flex-wrap mt-4">
            {wantToReadList?.books &&
              (wantToReadList?.books.length > 0 ? (
                wantToReadList?.books.map((book: BookData) => {
                  return (
                    <BookCard
                      key={book!.key}
                      title={book!.title}
                      author={
                        book?.authors?.[0]?.author?.key
                          ? wantToReadList.authorsDictionary[book.authors[0].author.key]
                          : "Unknown Author"
                      }
                      id={book!.key}
                      url={`/library/?`}
                      type={"dark"}
                    />
                  );
                })
              ) : (
                <div className="mt-4 text-text-secondary bg-secondary-cream p-4 rounded-xl">
                  No books in your Want To Read list.{" "}
                  <Link href="/" className="text-primary-burgundy underline hover:text-primary-navy transition-all">
                    Browse books to add to your list.
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="mt-10 border-t-2 border-border-light pt-10">
        <h2 className="text-2xl font-display font-semibold text-text-primary section-title">Read List</h2>
        {isLoading ? (
          <BookCardLoading />
        ) : (
          <div className="flex flex-wrap mt-4">
            {readList?.books &&
              (readList?.books.length > 0 ? (
                readList?.books.map((book: BookData) => {
                  return (
                    <BookCard
                      key={book!.key}
                      title={book!.title}
                      author={
                        book?.authors?.[0]?.author?.key
                          ? readList.authorsDictionary[book.authors[0].author.key]
                          : "Unknown Author"
                      }
                      id={book!.key}
                      url={`/library/?`}
                      type={"dark"}
                    />
                  );
                })
              ) : (
                <div className="mt-4 text-text-secondary bg-secondary-cream p-4 rounded-xl">
                  No books on your Read list yet.{" "}
                  <Link href="/" className="text-primary-burgundy underline hover:text-primary-navy transition-all">
                    Browse books to add to your list.
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
