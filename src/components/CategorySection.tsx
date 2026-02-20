import { Category, getProductsByCategory } from "@/data/menu";
import ProductCard from "./ProductCard";

interface CategorySectionProps {
  category: Category;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  const products = getProductsByCategory(category.id);

  return (
    <section id={`category-${category.id}`} className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
          {category.name}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
