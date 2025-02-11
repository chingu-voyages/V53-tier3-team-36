"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { subjects } from "app/definitions/CategoryList";

function CategoryCard({
  category,
  onCategoryClick,
  icon,
}: {
  category: string;
  onCategoryClick: () => void;
  icon: ReactNode;
}) {
  return (
    <div
      className="bg-foreground rounded-[8px] shadow-md text-black px-6 pb-4 pt-6 min-w-[230px] h-[130px] m-4 flex flex-col cursor-pointer hover:relative hover:bottom-[5px]"
      onClick={onCategoryClick}
    >
      <div className="grow ml-auto">{icon}</div>
      <span className="text-amber-50">{category}</span>
    </div>
  );
}

export default function Categories() {
  const router = useRouter();

  const onCategoryClick = (category: string) => {
    router.push(`/search/?category=${category}`);
  };

  return (
    <div className="pt-[60px]">
      <div className="text-3xl font-lumiFontLato pb-3 text-black text-center">
        Browse by Categories
      </div>
      <div className="flex flex-wrap my-0 mx-6 justify-center">
        {subjects.map(
          (
            {
              search,
              display,
              icon,
            }: { search: string; display: string; icon: ReactNode },
            i: number
          ) => {
            return (
              <CategoryCard
                key={i}
                category={display}
                onCategoryClick={() => {
                  onCategoryClick(search);
                }}
                icon={icon}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
