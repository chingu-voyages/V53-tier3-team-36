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
      className="bg-primary-navy rounded-2xl shadow-card text-white px-6 pb-4 pt-6 min-w-[230px] h-[130px] m-4 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:bg-primary-burgundy"
      onClick={onCategoryClick}
    >
      <div className="grow ml-auto text-accent-gold">{icon}</div>
      <span className="text-secondary-ivory font-medium">{category}</span>
    </div>
  );
}

export default function Categories() {
  const router = useRouter();

  const onCategoryClick = (category: string) => {
    router.push(`/search/?category=${category}`);
  };

  return (
    <div className="pt-[90px]">
      <div className="text-3xl font-display font-semibold pb-4 text-text-primary text-center">
        Browse by Categories
      </div>
      <div className="flex flex-wrap my-0 mx-6 justify-center mt-4">
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
