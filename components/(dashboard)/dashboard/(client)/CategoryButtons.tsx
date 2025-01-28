import { Button } from "@/components/ui/button";
import { Category } from "@/types/types";


interface CategoryButtonsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryButtons({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: CategoryButtonsProps) {
  return (
    <>
      <Button
        variant={activeCategory === "All" ? "default" : "outline"}
        onClick={() => setActiveCategory("All")}
        className="shadow-sm"
      >
        All Photos
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.title ? "default" : "outline"}
          onClick={() => setActiveCategory(cat.title)}
          className="shadow-sm"
        >
          {cat.title}
        </Button>
      ))}
    </>
  );
}