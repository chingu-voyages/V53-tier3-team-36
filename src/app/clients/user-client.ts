import { User } from "@/lib/models/user.model";
import { BookData } from "@/types/open-library";
import { OpenLibrary } from "./open-library-client";

export const UserClient = {
  getUser: async (): Promise<User> => {
    const res = await fetch("/api/user");
    if (res.ok) {
      return res.json();
    }
    throw new Error("Failed to get user book lists");
  },
  getReadingList: async (): Promise<{
    books: BookData[];
    authorsDictionary: Record<string, string>; // Key refers to the OpenLibrary key ie. /authors/OL123..A
  }> => {
    const res = await fetch("/api/user/books/read");
    if (!res.ok) {
      throw new Error("Failed to get reading list");
    }
    const olidWorkIds = (await res.json()) as string[]; // An array of OLIDs for books
    return fetchBookData(olidWorkIds);
  },
  getWantToRead: async (): Promise<{
    books: BookData[];
    authorsDictionary: Record<string, string>; // Key refers to the OpenLibrary key ie. /authors/OL123..A
  }> => {
    // First fetch the want-to-read-list from our own server for the user
    const res = await fetch("/api/user/books/want-to-read");
    if (!res.ok) {
      throw new Error("Failed to get want to read list");
    }

    const olidWorkIds = (await res.json()) as string[]; // An array of OLIDs for books

    // Create an array of promises to fetch the book data from OpenLibrary
    return fetchBookData(olidWorkIds);
  },
  updateProfile: async ({
    bio,
    hashtags,
  }: {
    bio: string;
    hashtags: string[];
  }): Promise<void> => {
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      body: JSON.stringify({ bio, hashtags }),
    });
    if (!res.ok) {
      throw new Error("Failed to update the profile");
    }
  },
};

// Helper method to fetch book data from OpenLibrary
async function fetchBookData(
  olidWorkIds: string[],
): Promise<{ books: BookData[]; authorsDictionary: Record<string, string> }> {
  const olidRequestPromises = olidWorkIds
    .filter((olid) => olid.includes("/works/"))
    .map((olid) => OpenLibrary.getBookById(olid));

  // Execute all promises and wait for all of them to return
  const promisesFetchResult = await Promise.allSettled(olidRequestPromises);

  // Convert the results to an array of BookData, rejected promises are filtered out
  const bookResults = promisesFetchResult.reduce((acc: BookData[], promise) => {
    if (promise.status === "fulfilled") {
      return (acc = acc.concat(promise.value));
    }
    return acc;
  }, []);

  // We need to get the authors for the books, so we create an array of promises to fetch the author data
  const authorRequestPromises = bookResults.map((bookResult) => {
    const authorKey = bookResult!.authors[0].author;
    return OpenLibrary.getAuthorData(authorKey.key!);
  });

  const authorMap: Record<string, string> = {}; // Create a dictionary to store the author data and the name, {key: name}

  // Execute all promises and wait for all of them to return. filter out any rejected promises
  (await Promise.allSettled(authorRequestPromises))
    .filter((result) => result.status === "fulfilled")
    .forEach((result) => {
      authorMap[result.value.key] = result.value.name;
    });

  return {
    books: bookResults,
    authorsDictionary: authorMap,
  };
}
