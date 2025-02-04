import { auth, signOut } from "@/auth/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    <div className={"flex flex-col items-center w-full"}>
      <h1 className={"font-bold text-lg"}>Welcome {user.name}</h1>
      {user.image && (
        <Image
          className={"rounded-full border border-black h-16 w-16 my-4"}
          src={user.image}
          alt={"User image"}
        />
      )}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign out
          </span>
        </button>
      </form>
    </div>
  ) : (
    redirect("/")
  );
}
