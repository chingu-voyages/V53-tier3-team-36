"use client";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/?title=${searchTerm}`);
    }
  };

  return (
    <input
      type="text"
      id="search-navbar"
      className="block w-[280px] lg:w-[320px] h-[48px] py-3 px-5 ps-12 text-sm text-text-primary border border-border-light rounded-full bg-white focus:ring-2 focus:ring-accent-gold focus:border-accent-gold focus:shadow-lg focus:scale-[1.02] placeholder-text-muted/70 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:border-border-medium"
      placeholder="Search books..."
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
    />
  );
}
