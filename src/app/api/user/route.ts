import { auth } from "@/auth/auth";
import { UserModel } from "@/lib/schemas/user.schema";
import { NextResponse } from "next/server";

export async function GET() {
  // This route will get the authenticated user
  const authSession = await auth();
  if (!authSession || !authSession.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const user = await UserModel.findById(authSession.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
