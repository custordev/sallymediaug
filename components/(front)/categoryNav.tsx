import { cn } from "@/lib/utils";
import { Category } from "@/types/types";


interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

export function CategoryNav({ categories, activeCategory, setActiveCategory }: CategoryNavProps) {
  return (
    <nav className="lg:hidden overflow-x-auto mb-6">
      <div className="flex whitespace-nowrap gap-8 pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "text-sm font-light transition-colors relative",
              activeCategory === category.id
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                : "text-gray-500"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}