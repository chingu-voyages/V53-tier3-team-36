export const BookClient = {
  markWantToRead: async (olid: string) => {
    const response = await fetch("/api/user/books/want-to-read", {
      method: "POST",
      body: JSON.stringify({ olid }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to mark book as want to read");
    }
  },
  markRead: async (olid: string, date: Date | null) => {
    const response = await fetch("/api/user/books/read", {
      method: "POST",
      body: JSON.stringify({ olid, date }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to mark book as read");
    }
  },
  undoMarkRead: async (olid: string) => {
    // This allows user to undo the 'mark as read' action
    const response = await fetch("/api/user/books/read", {
      method: "PATCH",
      body: JSON.stringify({ olid, action: "mark-unread" }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to mark book as unread");
    }
  },
  undoMarkWantToRead: async (olid: string) => {
    // This allows user to undo the 'want to read' action
    const response = await fetch("/api/user/books/want-to-read", {
      method: "PATCH",
      body: JSON.stringify({ olid, action: "mark-undo-want-to-read" }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to undo want to read");
    }
  },
  rateBook: async (olid: string, rating: number) => {
    // This allows user to rate a book
    const response = await fetch("/api/user/books/rating", {
      method: "POST",
      body: JSON.stringify({ olid, rating }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to rate book");
    }
  },
  deleteRating: async (olid: string) => {
    // This allows user to delete a rating
    const response = await fetch("/api/user/books/rating", {
      method: "PATCH",
      body: JSON.stringify({ olid, action: "delete" }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to delete rating");
    }
  },
  getBookRatingById: async (
    olid: string
  ): Promise<{ averageRating: number | null; userRating: number | null }> => {
    // This allows user to get the average rating of a book and the user's rating

    // Since the formatting of the olid is `/works/xxxx`, we need to extract the `OL1234W` part
    const extractedId = olid.split("/")[2];

    const response = await fetch(`/api/book/${extractedId}/rating`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to get book ratings");
    }
  },
};
