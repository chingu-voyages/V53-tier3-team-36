import { User } from "@/lib/models/user.model";

export const UserClient = {
  getUser: async (): Promise<User> => {
    const res = await fetch("/api/user");
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to get user book lists");
    }
  },
};
