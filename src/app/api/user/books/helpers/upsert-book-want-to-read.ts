import { BookModel } from "@/lib/schemas/book.schema";

export async function upsertBookWantToRead(olid: string, userId: string) {
  // Find the book in the collection, upsert as necessary
  const targetBook = await BookModel.findOne({ olid });

  if (!targetBook) {
    await BookModel.create({ olid: olid, wantToRead: [userId] });
    return;
  }
  targetBook.wantToRead = Array.from(
    new Set(targetBook.wantToRead.concat(userId))
  );

  await targetBook.save();
}
