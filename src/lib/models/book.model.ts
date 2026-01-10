export interface Book {
  olid: string;
  userRatings: Map<string, number>;
  readBy: Map<string, Date | null>;
  wantToRead: string[];
}
