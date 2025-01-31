export type BookData = null | {
  authors: Array<AuthorObject>;
  title: string;
  subjects: Array<string>;
  description: string | { [value: string]: string };
  key: string;
};

export type AuthorObject = {
  [author: string]: {
    [key: string]: string;
  };
};

export type AuthorData = null | {
  name: string;
};

export type OpenLibraryBook = {
  title: string;
  author_name: string | Array<string>;
  key: number;
  cover_i: string;
  first_publish_year: number;
};

export type BookAction =
  | "read"
  | "wantToRead"
  | "remove_read"
  | "remove_wantToRead";
export type OpenLibraryTrendingBooksAPIResponse = {
  works: Array<OpenLibraryBook>;
};
