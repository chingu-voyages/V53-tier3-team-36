"use client";
import { User } from "@/lib/models/user.model";
import { AuthorData, BookAction, BookData } from "@/types/open-library";
import { BookClient } from "app/clients/book-client";
import { OpenLibrary } from "app/clients/open-library-client";
import { UserClient } from "app/clients/user-client";
import { BookDataContext } from "app/contexts/BookDataContext";
import NextImg from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import StarRating from "../star-rating/StarRating";
type Props = {
  loggedIn: boolean;
};

export default function Dialog({ loggedIn }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const bookId = searchParams.get("work");

  const [bookData, setBookData] = useState<BookData>(null);
  const [lumiBookRatingData, setLumiBookRatingData] = useState<{
    userRating: number | null;
    averageRating: number | null;
  } | null>(null);
  const [authorData, setAuthorData] = useState<AuthorData>(null);
  const [loading, setLoading] = useState(false);

  const [userContext, setUserContext] = useState<User | null>(null);

  const extractedId = bookData?.key.split("/")[2];

  const { getWantToReadList, getReadList } = useContext(BookDataContext);

  async function handleBookAction(olId: string, action: BookAction) {
    try {
      switch (action) {
        case "read":
          await BookClient.markRead(olId, new Date());
          if (getReadList) getReadList();
          break;
        case "wantToRead":
          await BookClient.markWantToRead(olId);
          if (getWantToReadList) getWantToReadList();
          break;
        case "remove_read":
          await BookClient.undoMarkRead(olId);
          if (getReadList) getReadList();
          break;
        case "remove_wantToRead":
          await BookClient.undoMarkWantToRead(olId);
          if (getWantToReadList) getWantToReadList();
          break;
      }

      // Refresh the userContext, this should refresh the action buttons
      await getUserContext();
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  useEffect(() => {
    setLoading(true);

    const getBookData = async () => {
      const res = await OpenLibrary.getBookById(bookId!);
      setBookData(res);
    };

    if (bookId) {
      getBookData();
    }
  }, [bookId]);

  const getUserContext = async () => {
    const response = await UserClient.getUser();
    setUserContext(response);
  };

  useEffect(() => {
    getUserContext();
  }, [bookId]);

  useEffect(() => {
    if (bookId) getBookRatingData();
  }, [bookId]);

  useEffect(() => {
    if (bookData?.authors) {
      const getAuthorData = async () => {
        const authorKey = bookData.authors[0]?.author.key;
        const authorData = await OpenLibrary.getAuthorData(authorKey);
        setAuthorData(authorData);
      };
      getAuthorData().catch(console.error);
    }
    setLoading(false);
  }, [bookData]);

  const getBookRatingData = async () => {
    const response = await BookClient.getBookRatingById(bookId!);
    setLumiBookRatingData(response);
  };

  function isOnUserReadList(): boolean {
    if (!userContext) return false;
    if (!bookData) return false;
    return userContext.read.includes(bookData.key);
  }

  function isOnWantToReadList(): boolean {
    if (!userContext) return false;
    if (!bookData) return false;
    return userContext.wantToRead.includes(bookData.key);
  }

  const closeDialog = () => {
    dialogRef.current?.close();
    router.back();
  };

  const handleBookActionTaken = (action: BookAction) => {
    if (bookData) {
      handleBookAction(bookData.key, action);
    }
  };

  const handleUpdateRating = async (rating: number) => {
    // If the rating is -1  then delete the rating
    if (rating === -1) {
      try {
        if (bookData) {
          await BookClient.deleteRating(bookData.key!);
          // Refresh the rating data
          await getBookRatingData();
        }
      } catch (error) {
        console.error("Failed to delete rating", (error as Error).message);
      }
    } else {
      try {
        if (bookData) {
          await BookClient.rateBook(bookData.key!, rating);
          await getBookRatingData();
        }
      } catch (error) {
        console.error("failed to rate book", (error as Error).message);
      }
    }
  };

  const dialog = showDialog === "y" && (
    <dialog
      ref={dialogRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-2xl backdrop:bg-primary-navy/60"
    >
      <div className="md:w-[500px] max-w-full bg-white flex flex-col border-2 border-primary-burgundy rounded-2xl shadow-card-hover">
        <div className="flex flex-row justify-end pt-3 px-5">
          <button
            onClick={closeDialog}
            className="mb-2 py-1 px-2 cursor-pointer rounded-lg border border-border-light w-8 h-8 font-bold text-text-primary hover:bg-primary-burgundy hover:text-white hover:border-primary-burgundy transition-all"
          >
            X
          </button>
        </div>
        <div className="px-6 pb-6">
          {loading && <span>Loading...</span>}
          {bookData && authorData && (
            <div>
              <div className="flex-col md:flex md:flex-row">
                <div className="mb-4 shadow-card rounded-xl overflow-hidden w-fit min-w-[150px] min-h-[200px]">
                  <NextImg
                    src={`https://covers.openlibrary.org/w/olid/${extractedId}.jpg`}
                    alt="book cover"
                    height={200}
                    width={150}
                  />
                </div>
                <div>
                  <div className="my-2 md:ml-4 md:mt-0 bg-secondary-cream p-4 rounded-xl">
                    {/* Ratings */}
                    <div id="averageRating">
                      <StarRating
                        ratingProps={
                          lumiBookRatingData
                            ? lumiBookRatingData.averageRating!
                            : null
                        }
                        title="Average Rating"
                        readOnly
                      />
                    </div>
                    {loggedIn && (
                      <div id="userRating">
                        <StarRating
                          ratingProps={
                            lumiBookRatingData
                              ? lumiBookRatingData.userRating!
                              : null
                          }
                          title="My Rating"
                          onRatingChanged={handleUpdateRating}
                        />
                      </div>
                    )}
                  </div>
                  {loggedIn && (
                    <div className="mt-2 md:ml-4 flex flex-col">
                      {!isOnUserReadList() ? (
                        <button
                          onClick={() => handleBookActionTaken("read")}
                          className="bg-primary-navy text-white py-2 px-4 rounded-xl border-none mr-2 mb-2 w-[225px] font-medium hover:bg-primary-burgundy transition-all shadow-sm"
                        >
                          Add to Read
                        </button>
                      ) : (
                        <button
                          className="bg-accent-copper text-white py-2 px-4 rounded-xl border-none mr-2 mb-2 w-[225px] font-medium hover:bg-primary-burgundy transition-all shadow-sm"
                          onClick={() => handleBookActionTaken("remove_read")}
                        >
                          Remove from read List
                        </button>
                      )}
                      {!isOnWantToReadList() ? (
                        <button
                          onClick={() => handleBookActionTaken("wantToRead")}
                          className="bg-primary-navy text-white py-2 px-4 rounded-xl border-none w-[225px] mb-4 font-medium hover:bg-primary-burgundy transition-all shadow-sm"
                        >
                          Add to Want To Read
                        </button>
                      ) : (
                        <button
                          className="bg-accent-copper text-white py-2 px-4 rounded-xl border-none mr-2 w-[225px] mb-4 font-medium hover:bg-primary-burgundy transition-all shadow-sm"
                          onClick={() =>
                            handleBookActionTaken("remove_wantToRead")
                          }
                        >
                          Remove from want-to-read list
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-3xl font-display font-bold text-text-primary mt-4">{bookData.title}</h1>
              <h4 className="text-lg italic pb-3 text-text-secondary">{authorData.name}</h4>
              <div className="pb-3 text-text-muted">
                {bookData.subjects
                  ?.slice(0, 5)
                  .map((subject: string, i: number) => (
                    <span key={i} className="text-sm">
                      {subject}
                      {i !== 4 && ","}{" "}
                    </span>
                  ))}
              </div>
              <span className="text-text-secondary leading-relaxed">
                {bookData.description &&
                  (typeof bookData.description === "string"
                    ? bookData.description
                    : bookData.description.value)}
              </span>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );

  return dialog;
}
