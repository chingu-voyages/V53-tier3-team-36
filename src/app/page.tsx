"use client";
import StaffPicks from "@/components/dashboard/StaffPicks";
import TrendingBooks from "@/components/dashboard/TrendingBooks";

export default function Home() {
  return (
    <div className="w-full pt-3 pb-6">
      <TrendingBooks />
      <StaffPicks />
    </div>
  );
}
