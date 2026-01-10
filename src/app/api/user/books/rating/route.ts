import { auth } from "@/auth/auth";
import connectDb from "@/lib/mongodb/mongodb";
import { BookModel } from "@/lib/schemas/book.schema";
import { UserModel } from "@/lib/schemas/user.schema";
import {
  deleteBookRatingValidator,
  rateBookValidator,
} from "@/lib/validators/rate-book-validator";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { upsertBookRating } from "../helpers/upsert-book-rating";

// Post a rating for a book
// If the user has already rated the book, update the rating
export async function POST(req: NextRequest) {
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const requestBody = await req.json();
  try {
    rateBookValidator.parse(requestBody);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  const { olid, rating } = requestBody;
  try {
    await connectDb();
    const user = await UserModel.findById(authSession.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.rated = Array.from(new Set([...user.rated, olid]));

    // upsert to the book collection
    await upsertBookRating(olid, authSession.user.id as string, rating);
    await user.save();

    return NextResponse.json({
      message: `Updated book rating for ${olid} successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed update book rating: " + (error as Error).message },
      { status: 500 }
    );
  }
}

// This route deletes a rating for a user
export async function PATCH(req: NextRequest) {
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const requestBody = await req.json();

  try {
    deleteBookRatingValidator.parse(requestBody);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { olid } = requestBody; // We won't worry about the 'action' value in the response body for now, maybe we'll need it when we expand functionality
  try {
    await connectDb();
    const user = await UserModel.findById(authSession.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.rated = user.rated.filter((ratedBook) => ratedBook !== olid);

    // Find the book and delete the user's rating
    const targetBook = await BookModel.findOne({
      olid,
    });
    if (!targetBook)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });

    targetBook.userRatings.delete(authSession.user.id as string);

    await user.save();
    await targetBook.save();
    return NextResponse.json({
      message: `Removed user rating for book with olid ${olid}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book rating:" + (error as Error).message },
      { status: 500 }
    );
  }
}
