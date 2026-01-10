"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BookCardLoading() {
  return (
    <div
      style={{
        display: "flex",
        width: "170px",
        height: "315px",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Skeleton containerClassName="flex-1 w-[170px] h-[240px]" height={240} />
      <Skeleton width={120} height={10} />
      <Skeleton width={100} height={10} />
    </div>
  );
}
