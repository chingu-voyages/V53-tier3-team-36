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
    <nav className="bg-secondary-cream border-b border-border-light shadow-nav md:pb-0 pb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4 px-4 pt-4 pb-0">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <div className="logo-float logo-shimmer">
            <NextImg
              src="https://img.icons8.com/?size=100&id=23662&format=png&color=000000"
              className="h-11 w-11 transition-all duration-500 ease-out group-hover:scale-105"
              alt="Luminaria Logo"
              width={44}
              height={44}
            />
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-burgundy font-display transition-all duration-500 ease-out group-hover:text-primary-navy">
            Luminaria
          </span>
        </Link>
        <div className="flex md:order-1">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-text-secondary hover:bg-warm-white hover:text-primary-burgundy focus:outline-none focus:ring-2 focus:ring-accent-gold rounded-xl text-sm p-3 me-1 transition-all duration-300 hover:shadow-md active:scale-95"
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
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-text-muted"
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
            className="inline-flex items-center p-3 w-11 h-11 justify-center text-sm text-text-secondary rounded-xl md:hidden hover:bg-warm-white hover:text-primary-burgundy focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all duration-300 hover:shadow-md active:scale-95"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-border-light rounded-xl bg-white md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {isLoggedIn ? (
              <>
                <li>
                  <a
                    href="/library"
                    className="block py-3 px-5 rounded-xl text-text-primary hover:text-primary-burgundy hover:bg-warm-white md:hover:bg-transparent md:p-0 font-medium transition-all duration-300"
                    aria-current="page"
                  >
                    Library
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block py-3 px-5 rounded-xl text-text-primary hover:text-primary-burgundy hover:bg-warm-white md:hover:bg-transparent md:p-0 font-medium transition-all duration-300"
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
                  className="block h-[48px] py-3 px-7 rounded-xl bg-primary-burgundy text-white hover:bg-primary-navy md:bg-primary-burgundy font-medium transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        className={`relative ${
          menuType === "search" ? "block" : "hidden"
        } mx-4 mt-4`}
      >
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none z-10">
          <svg
            className="w-5 h-5 text-text-muted"
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
