import { auth } from "@/auth/auth";
import connectDb from "@/lib/mongodb/mongodb";
import { BookModel } from "@/lib/schemas/book.schema";
import { UserModel } from "@/lib/schemas/user.schema";

import { undoMarkWantToReadValidator } from "@/lib/validators/mark-want-to-read-validator";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { upsertBookWantToRead } from "../helpers/upsert-book-want-to-read";

export async function POST(req: NextRequest) {
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const requestBody = await req.json();
  const { olid } = requestBody;

  if (!olid)
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  try {
    const user = await UserModel.findById(authSession.user.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.wantToRead = Array.from(new Set(user.wantToRead.concat(olid)));

    await upsertBookWantToRead(olid, authSession.user.id as string);

    await user.save();
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to mark book as want to read" },
      { status: 500 }
    );
  }
}

// Remove a book from the user's want-to-read list (undo) and update the book collection
export async function PATCH(req: NextRequest) {
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const requestBody = await req.json();

  try {
    undoMarkWantToReadValidator.parse(requestBody);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  const { olid } = requestBody;

  try {
    await connectDb();
    const user = await UserModel.findById(authSession.user.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userWantToReadList = user.wantToRead;

    // Remove the book from the user's want-to-read list
    const filteredList = userWantToReadList.filter((book) => book !== olid);
    user.wantToRead = filteredList;

    // Update the book by searching for it by olid and removing the user's id from the wantToRead array
    const targetBook = await BookModel.findOne({ olid });
    if (!targetBook)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });

    targetBook.wantToRead = targetBook.wantToRead.filter(
      (userId) => userId !== authSession!.user!.id
    );

    await user.save();
    await targetBook.save();
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to mark book as unread" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Gets the authenticated user's want-to-read list
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  try {
    const user = await UserModel.findById(authSession.user.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user.wantToRead);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get want to read list:" + (error as Error).message },
      { status: 500 }
    );
  }
}
