import { BookModel } from "@/lib/schemas/book.schema";

export async function upsertBookRating(
  olid: string,
  userId: string,
  rating: number
): Promise<void> {
  // Checks if a book exists in the collection, if not, creates a new document and adds the rating
  // otherwise, updates the rating
  const targetBook = await BookModel.findOne({ olid });
  if (!targetBook) {
    await BookModel.create({
      olid,
      userRatings: { [userId]: rating },
    });
    return;
  }

  targetBook.userRatings.set(userId, rating);
  await targetBook.save();
}
