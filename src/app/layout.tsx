import PageLayout from "@/components/pageLayout/PageLayout";
import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import { BookDataProvider } from "./contexts/BookDataContext";
import "./globals.css";
import { NextAuthProvider } from "./providers/next-auth-provider";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luminaria",
  description: "Your personal library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${sourceSans.variable} antialiased`}
      >
        <NextAuthProvider>
          <BookDataProvider>
            <PageLayout>{children}</PageLayout>
          </BookDataProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
