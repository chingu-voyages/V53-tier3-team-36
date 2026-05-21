"use client";
import { BookData } from "@/types/open-library";
import { UserClient } from "app/clients/user-client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

type BookDataState = {
  wantToReadList: BookListWithAuthorDict | null;
  readList: BookListWithAuthorDict | null;
  getWantToReadList?: () => void;
  getReadList?: () => void;
  isLoading: boolean;
};

type BookListWithAuthorDict = {
  books: BookData[];
  authorsDictionary: Record<string, string>;
};

const initialState: BookDataState = {
  wantToReadList: null,
  readList: null,
  isLoading: false,
};

const BookDataContext = createContext(initialState);

type BookDataProvider = {
  children: React.ReactNode;
};
const BookDataProvider = ({ children }: BookDataProvider) => {
  const { status } = useSession();
  const [wantToReadList, setWantToReadList] =
    useState<BookListWithAuthorDict | null>(null);
  const [readList, setReadList] = useState<BookListWithAuthorDict | null>(null);

  const getWantToReadList = async () => {
    if (status !== "authenticated") return;
    setIsLoading(true);
    const data = await UserClient.getWantToRead();
    setWantToReadList(data);
    setIsLoading(false);
  };

  const getReadList = async () => {
    if (status !== "authenticated") return;
    setIsLoading(true);
    const data = await UserClient.getReadingList();
    setReadList(data);
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    getWantToReadList();
    getReadList();
  }, [status]);

  return (
    <BookDataContext.Provider
      value={{
        wantToReadList,
        readList,
        getWantToReadList,
        getReadList,
        isLoading,
      }}
    >
      {children}
    </BookDataContext.Provider>
  );
};

export { BookDataContext, BookDataProvider };
