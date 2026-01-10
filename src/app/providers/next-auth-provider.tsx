"use client";
import { SessionProvider } from "next-auth/react";
import { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
