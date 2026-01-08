import { Category, getProductsByCategory } from "@/data/menu";
import ProductCard from "./ProductCard";

interface CategorySectionProps {
  category: Category;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  const products = getProductsByCategory(category.id);

  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
          {category.name}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
