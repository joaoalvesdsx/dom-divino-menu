import { CartProvider } from "@/hooks/useCart";
import { categories } from "@/data/menu";
import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import Cart from "@/components/Cart";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl lg:max-w-none px-4 sm:px-6 lg:px-12 xl:px-20 mx-auto lg:mx-0 py-8">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </main>

        <Cart />

        <footer className="bg-card border-t border-border py-6 px-4 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-sans text-lg text-primary mb-1">
              Dom Divino Congelados
            </p>
            <p className="text-sm text-muted-foreground">Feito em casa</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
