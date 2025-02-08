import {
  BookData,
  OpenLibraryTrendingBooksAPIResponse,
  SearchBookList,
} from "@/types/open-library";

const OL_URL = "https://openlibrary.org";

export const OpenLibrary = {
  getTrendingBooks: async (): Promise<OpenLibraryTrendingBooksAPIResponse> => {
    const response = await fetch(`${OL_URL}/trending/daily.json?page=1`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch trending books list");
    }
  },
  getBookById: async (olid: string): Promise<BookData> => {
    const response = await fetch(`${OL_URL}${olid}.json`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch book data");
    }
  },
  getAuthorData: async (
    authorKey: string
  ): Promise<{ name: string; key: string }> => {
    const response = await fetch(`${OL_URL}${authorKey}.json`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch author data");
    }
  },
  getBooksBySearch: async (searchTerm: string): Promise<SearchBookList> => {
    const response = await fetch(`${OL_URL}/search.json?q=${searchTerm}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch search data");
    }
  },
};
