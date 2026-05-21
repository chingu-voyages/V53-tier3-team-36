import {
  BookData,
  OpenLibraryTrendingBooksAPIResponse,
  SearchBookList,
} from "@/types/open-library";

const OL_URL = "https://openlibrary.org";

// Fallback trending books data (verified against Open Library) for when API is unreachable
const fallbackTrendingWorks = [
  { key: "/works/OL15829966W", title: "Cosmos", author_name: ["Carl Sagan"], cover_i: "", first_publish_year: 1980 },
  { key: "/works/OL134601W", title: "Lonesome Dove", author_name: ["Larry McMurtry"], cover_i: "", first_publish_year: 1985 },
  { key: "/works/OL45804W", title: "Fantastic Mr Fox", author_name: ["Roald Dahl"], cover_i: "", first_publish_year: 1970 },
  { key: "/works/OL10834W", title: "Perfume", author_name: ["Patrick Süskind"], cover_i: "", first_publish_year: 1985 },
  { key: "/works/OL21009648W", title: "Steppenwolf", author_name: ["Hermann Hesse"], cover_i: "", first_publish_year: 1927 },
  { key: "/works/OL1911334W", title: "The Chrysalids", author_name: ["John Wyndham"], cover_i: "", first_publish_year: 1955 },
  { key: "/works/OL10343120W", title: "The diary of Anaïs Nin", author_name: ["Anaïs Nin"], cover_i: "", first_publish_year: 1966 },
  { key: "/works/OL26841047W", title: "Existential Physics", author_name: ["Sabine Hossenfelder"], cover_i: "", first_publish_year: 2022 },
  { key: "/works/OL95178W", title: "The collected works of C.G. Jung", author_name: ["C.G. Jung"], cover_i: "", first_publish_year: 1953 },
  { key: "/works/OL3511459W", title: "Stoner", author_name: ["John Williams"], cover_i: "", first_publish_year: 1965 },
  { key: "/works/OL24600223W", title: "The Brothers Karamazov", author_name: ["Fyodor Dostoevsky"], cover_i: "", first_publish_year: 1880 },
];

export const OpenLibrary = {
  getTrendingBooks: async (): Promise<OpenLibraryTrendingBooksAPIResponse> => {
    try {
      const response = await fetch(`${OL_URL}/trending/daily.json?page=1`);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn("Open Library API unreachable, using fallback data");
    }
    return { works: fallbackTrendingWorks };
  },
  getBookById: async (olid: string): Promise<BookData> => {
    try {
      const response = await fetch(`${OL_URL}${olid}.json`);
      if (response.ok) {
        return response.json();
      }
    } catch (e) {
      console.warn(`Open Library API unreachable for ${olid}, using fallback`);
    }
    return { key: olid, title: "", subjects: [], description: "", authors: [] };
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
  getBooksBySubjectSearch: async (subject: string): Promise<OpenLibraryTrendingBooksAPIResponse> => {
    const response = await fetch(`${OL_URL}/subjects/${subject}.json`);
    if (response.ok) {
      return response.json();
    }
    throw new Error("Failed to fetch book subject");
  },
};
