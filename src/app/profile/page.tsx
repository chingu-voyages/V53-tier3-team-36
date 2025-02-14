"use client";
import { signOut } from "next-auth/react";
import { User } from "@/lib/models/user.model";
import { UserClient } from "app/clients/user-client";
import { useSession } from "next-auth/react";
import NextImg from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function Profile() {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserClient.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);
  if (status === "unauthenticated") return redirect("/");
  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="font-bold text-lg">
        Welcome {currentUser?.name ?? "Anonymous"}
      </h1>

      {currentUser?.imageUrl && (
        <NextImg
          className="rounded-full border border-black h-16 w-16 my-4"
          src={currentUser?.imageUrl}
          alt="User image"
          width={32}
          height={32}
        />
      )}

      <div className="mt-4">
        <p>
          <strong>Name:</strong> {currentUser?.name ?? "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {currentUser?.email ?? "N/A"}
        </p>
      </div>

      <form
        action={async () => {
          await signOut();
        }}
        className="mt-4"
      >
        <button className="p-2 bg-red-500 text-white rounded">Sign out</button>
      </form>
      {currentUser && <ProfileForm user={currentUser} />}
    </div>
  );
}

function ProfileForm({ user }: { user: Partial<User> }) {
  return (
    <form
      action={updateProfile}
      className="mt-8 flex flex-col gap-4 w-full max-w-md"
    >
      <label htmlFor="bio">Bio</label>
      <textarea id="bio" name="bio" defaultValue={user.bio ?? ""} rows={4} />

      <label htmlFor="hashtags">Hashtags (comma separated)</label>
      <input
        id="hashtags"
        name="hashtags"
        defaultValue={user.hashtags?.join(", ") ?? ""}
      />

      <button type="submit" className="p-2 bg-blue-600 text-white rounded">
        Update Profile
      </button>
    </form>
  );
}

async function updateProfile(formData: FormData) {
  // parse fields
  const bio = formData.get("bio")?.toString() || "";
  const hashtagsString = formData.get("hashtags")?.toString() || "";
  const hashtags = hashtagsString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await UserClient.updateProfile({ hashtags, bio });

  // redirect to see changes
  redirect("/profile");
}
