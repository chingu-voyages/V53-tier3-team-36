export interface User {
  email: string;
  name: string;
  imageUrl?: string;
  bio?: string;
  read: string[];
  wantToRead: string[];
  rated: string[];
  hashtags: string[];
}
