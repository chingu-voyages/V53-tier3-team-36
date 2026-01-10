import { BookModel } from "@/lib/schemas/book.schema";

export async function upsertBookRead(olid: string, date: Date, userId: string) {
  // This will find a book by its open library id and user id and update the document
  // If the book does not exist, it will be created
  const targetBook = await BookModel.findOne({
    olid,
  });
  if (!targetBook) {
    await BookModel.create({
      olid,
      readBy: { [userId]: date },
    });
    return;
  }
  targetBook.readBy.set(userId, date);
  await targetBook.save();
}
