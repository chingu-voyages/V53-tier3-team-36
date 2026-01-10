import { auth } from "@/auth/auth";
import { BookModel } from "@/lib/schemas/book.schema";
import { NextResponse, NextRequest } from "next/server";

type RouteParams = Record<string, string>;

// This route gets the average rating of a book and the user's rating
export async function GET (req: NextRequest, data: { params: Promise<RouteParams> } ) {
  const authSession = await auth()
  if (!authSession || !authSession.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const { olid } = await data.params;

  // Find the book in the Books collection - there is a chance the book may not exist. If it doesn't create it
  const book = await BookModel.findOne({ olid: `/works/${olid}` });

  // If the book doesn't exist, there is no raiting info, so return null.
  if (!book)
    return NextResponse.json(
      { averageRating: null, userRating: null },
      { status: 200 }
    );

  // Find the authenticated user's rating if it exists
  const userRating = book.userRatings.get(authSession.user.id as string) ?? null;

  // If the book has no ratings, short circuit and return null
  if (!book.userRatings || book.userRatings.size === 0) {
    return NextResponse.json(
      { averageRating: null, userRating },
      { status: 200 }
    );
  }

  let ratingsSum = 0;
  for (const [, value] of book.userRatings) {
    ratingsSum += value;
  }
  return NextResponse.json(
    {
      userRating,
      averageRating: Math.floor(ratingsSum / book.userRatings.size),
    },
    { status: 200 }
  );
};
