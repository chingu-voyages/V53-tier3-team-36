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
      className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search..."
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
    />
  );
}
