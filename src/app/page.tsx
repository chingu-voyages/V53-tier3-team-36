"use client";
import TrendingBooks from "@/components/trendingBooks/TrendingBooks";
import { BookAction } from "@/types/open-library";
import Dialog from "components/dialog/Dialog";
import { useSession } from "next-auth/react";
import { BookClient } from "./clients/book-client";

export default function Home() {
  const { data: session } = useSession();

  const user = session?.user;

  async function onClose() {
    console.log("Modal has closed");
  }

  async function handleBookActionTaken(olId: string, action: BookAction) {
    try {
      switch (action) {
        case "read":
          await BookClient.markRead(olId, new Date());
          break;
        case "wantToRead":
          await BookClient.markWantToRead(olId);
          break;
        case "remove_read":
          await BookClient.undoMarkRead(olId);
          break;
        case "remove_wantToRead":
          await BookClient.undoMarkWantToRead(olId);
          break;
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  return (
    <div className="w-full">
      <TrendingBooks />
      <Dialog
        onClose={onClose}
        onBookActionTaken={handleBookActionTaken}
        loggedIn={user === undefined ? false : true}
      />
    </div>
  );
}
