import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import connectDb from "@/lib/mongodb/mongodb";
import { UserModel } from "@/lib/schemas/user.schema";

export async function PATCH(req: NextRequest) {
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  const requestBody = await req.json();
  const { bio, hashtags } = requestBody;

  try {
    await connectDb();
    const user = await UserModel.findById(authSession.user.id);
    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 401 });
    if (bio) user.bio = bio;
    if (hashtags) user.hashtags = hashtags;
    await user.save();
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
