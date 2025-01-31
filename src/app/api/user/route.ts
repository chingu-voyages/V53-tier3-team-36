import { auth } from "@/auth/auth";
import { UserModel } from "@/lib/schemas/user.schema";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  // This route will get the authenticated user
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const user = await UserModel.findById(req.auth.user.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
});
