import { auth, signOut } from "@/auth/auth";
import NextImg from "next/image";
import { redirect } from "next/navigation";
import type { User } from "next-auth";

import connectDb from "@/lib/mongodb/mongodb";   // default export from mongodb.ts
import { UserModel } from "@/lib/models/user.model"; // named export

type ExtendedUser = User & {
  id?: string;
  bio?: string;
  hashtags?: string[];
};

export default async function Profile() {
  const session = await auth();
  const user = session?.user as ExtendedUser | undefined;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="font-bold text-lg">
        Welcome {user.name ?? "Anonymous"}
      </h1>

      {user.image && (
        <NextImg
          className="rounded-full border border-black h-16 w-16 my-4"
          src={user.image}
          alt="User image"
          width={32}
          height={32}
        />
      )}

      <div className="mt-4">
        <p><strong>Name:</strong> {user.name ?? "N/A"}</p>
        <p><strong>Email:</strong> {user.email ?? "N/A"}</p>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mt-4"
      >
        <button className="p-2 bg-red-500 text-white rounded">
          Sign out
        </button>
      </form>

      <ProfileForm user={user} />
    </div>
  );
}

function ProfileForm({ user }: { user: ExtendedUser }) {
  return (
    <form action={updateProfile} className="mt-8 flex flex-col gap-4 w-full max-w-md">
      <label htmlFor="bio">Bio</label>
      <textarea id="bio" name="bio" defaultValue={user.bio ?? ""} rows={4} />

      <label htmlFor="hashtags">Hashtags (comma separated)</label>
      <input id="hashtags" name="hashtags" defaultValue={user.hashtags?.join(", ") ?? ""} />

      <button type="submit" className="p-2 bg-blue-600 text-white rounded">
        Update Profile
      </button>
    </form>
  );
}

async function updateProfile(formData: FormData) {
  "use server";

  // parse fields
  const bio = formData.get("bio")?.toString() || "";
  const hashtagsString = formData.get("hashtags")?.toString() || "";
  const hashtags = hashtagsString.split(",").map(t => t.trim()).filter(Boolean);

  // re-check session
  const session = await auth();
  const user = session?.user as ExtendedUser | undefined;
  if (!user?.id) {
    redirect("/");
  }

  // connect to Mongo
  await connectDb();

  // update the doc
  await UserModel.findByIdAndUpdate(user.id, { bio, hashtags }, { new: true });

  // redirect to see changes
  redirect("/profile");
}
