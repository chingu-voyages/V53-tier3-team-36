"use client";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput({ id = "search-navbar" }: { id?: string }) {
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
      id={id}
      className="block w-[280px] lg:w-[320px] h-[48px] py-3 px-5 ps-12 text-sm text-text-primary border border-accent-gold/40 rounded-full bg-secondary-cream/95 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold focus:bg-white focus:shadow-lg focus:scale-[1.02] placeholder-primary-burgundy/40 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:border-accent-gold/60 hover:bg-white"
      placeholder="Search books..."
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
    />
  );
}
