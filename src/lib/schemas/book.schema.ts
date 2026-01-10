import mongoose, { Schema } from "mongoose";
import { Book } from "../models/book.model";

const bookSchema = new Schema<Book>(
  {
    olid: { type: String, required: true, unique: true },
    userRatings: { type: Map, of: Number, default: {} },
    wantToRead: { type: [String], default: [] },
    readBy: { type: Map, of: Date, default: {} },
  },
  { timestamps: true }
);

export const BookModel: mongoose.Model<Book> =
  mongoose.models.Book || mongoose.model<Book>("Book", bookSchema);
