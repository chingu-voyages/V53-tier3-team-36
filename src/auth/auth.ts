import connectDb from "@/lib/mongodb/mongodb";
import { UserModel } from "@/lib/schemas/user.schema";
import NextAuth, { Account, Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google, { GoogleProfile } from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      console.log("🚨 GitHub Auth Flow Started");
      console.log("Provider:", account?.provider);
      console.log("Profile Email:", profile?.email);
      console.log("Profile Data:", JSON.stringify(profile, null, 2));
      console.log("No profile found");
      if (!profile) return false;
      console.log("No account found");
      if (!account) return false;

      try {
        await connectDb();
        const existingUser = await UserModel.findOne({
          email: profile.email,
        });

        if (!existingUser) {
          // Check if the user exists in our database, if they don't, add them
          await UserModel.create({
            email: profile.email,
            name: getUsernameFromProfile(account, profile),
          });
        }
      } catch (error) {
        console.error(error);
        return false;
      }

      return true;
    },
    jwt: async ({ token }) => {
      if (!token.email) throw new Error("No email found in token");
      await connectDb();
      const existingUser = await UserModel.findOne({ email: token.email });

      token = {
        ...token,
        id: existingUser?._id.toString(),
      };
      return token;
    },
    session: async ({ session, token }) => {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
      return session;
    },
  },
});

function getUsernameFromProfile(account: Account, profile: Profile): string {
  if (account.provider === "google") {
    // For Google, combine the first and last name
    return `${(profile as GoogleProfile).given_name} ${
      (profile as GoogleProfile).family_name
    }`;
  }

  // Otherwise, just use the name
  return profile.name!;
}
