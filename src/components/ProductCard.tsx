import { Product } from "@/data/menu";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-sans font-semibold text-lg text-foreground">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                {product.type}
              </span>
              <span className="text-sm text-muted-foreground">
                {product.weight}
              </span>
            </div>
          </div>
          <p className="text-lg font-semibold text-accent">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-secondary rounded-full px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
                onClick={() => removeItem(product.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-foreground min-w-[20px] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
                onClick={() => addItem(product)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => addItem(product)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
