"use client";

import SearchInput from "components/header/SearchInput";
import NextImg from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  handleLogin: () => void;
  isLoggedIn: boolean;
};

export default function Header({ handleLogin, isLoggedIn }: Props) {
  const [menuType, setMenuType] = useState<undefined | string>(undefined);

  return (
    <nav className="bg-backbground border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <NextImg
            src="https://img.icons8.com/?size=100&id=23662&format=png&color=000000"
            className="h-8"
            alt="Luminaria Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Luminaria
          </span>
        </Link>
        <div className="flex md:order-1">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            onClick={() => {
              if (menuType === undefined || menuType === "links") {
                setMenuType("search");
              } else {
                setMenuType(undefined);
              }
            }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <SearchInput />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={() => {
              if (menuType === undefined || menuType === "search") {
                setMenuType("links");
              } else {
                setMenuType(undefined);
              }
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            menuType === "links" ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            {isLoggedIn ? (
              <>
                <li>
                  <a
                    href="/library"
                    className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 md:dark:text-black hover:text-blue-600"
                    aria-current="page"
                  >
                    Library
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 md:dark:text-black hover:text-blue-600"
                    aria-current="page"
                  >
                    Profile
                  </a>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogin}
                  className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 md:dark:text-black hover:text-blue-600"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={`relative ${menuType === "search" ? "block" : "hidden"}`}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <SearchInput />
      </div>
    </nav>
  );
}
