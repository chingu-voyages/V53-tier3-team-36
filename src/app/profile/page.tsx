"use client";
import { signOut } from "next-auth/react";
import { User } from "@/lib/models/user.model";
import { UserClient } from "app/clients/user-client";
import { useSession } from "next-auth/react";
import NextImg from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function Profile() {
  const { status } = useSession();
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
    <div className="flex flex-col items-center w-full p-6">
      <h1 className="font-display font-bold text-2xl text-text-primary">
        Welcome {currentUser?.name ?? "Anonymous"}
      </h1>

      {currentUser?.imageUrl && (
        <NextImg
          className="rounded-full border-2 border-primary-burgundy h-20 w-20 my-6 shadow-card"
          src={currentUser?.imageUrl}
          alt="User image"
          width={80}
          height={80}
        />
      )}

      <div className="mt-4 bg-secondary-cream p-6 rounded-2xl shadow-card">
        <p className="text-text-secondary">
          <strong className="text-text-primary">Name:</strong> {currentUser?.name ?? "N/A"}
        </p>
        <p className="text-text-secondary mt-2">
          <strong className="text-text-primary">Email:</strong> {currentUser?.email ?? "N/A"}
        </p>
      </div>

      <form
        action={async () => {
          await signOut();
        }}
        className="mt-6"
      >
        <button className="px-6 py-2 bg-primary-burgundy text-white rounded-xl font-medium hover:bg-primary-navy transition-all shadow-sm">Sign out</button>
      </form>
      {currentUser && <ProfileForm user={currentUser} />}
    </div>
  );
}

function ProfileForm({ user }: { user: Partial<User> }) {
  return (
    <form
      action={updateProfile}
      className="mt-10 flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-card border border-border-light"
    >
      <label htmlFor="bio" className="text-text-primary font-medium">Bio</label>
      <textarea 
        id="bio" 
        name="bio" 
        defaultValue={user.bio ?? ""} 
        rows={4} 
        className="border border-border-light rounded-xl p-3 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all text-text-primary"
      />

      <label htmlFor="hashtags" className="text-text-primary font-medium">Hashtags (comma separated)</label>
      <input
        id="hashtags"
        name="hashtags"
        defaultValue={user.hashtags?.join(", ") ?? ""}
        className="border border-border-light rounded-xl p-3 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all text-text-primary"
      />

      <button type="submit" className="px-6 py-3 bg-primary-navy text-white rounded-xl font-medium hover:bg-primary-burgundy transition-all shadow-sm mt-2">
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
