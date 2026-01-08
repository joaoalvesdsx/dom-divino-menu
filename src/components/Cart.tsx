import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    addItem,
    updateQuantity,
    observations,
    setObservations,
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <div className="relative">
            <ShoppingBag className="h-7 w-7" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-sans text-2xl">Seu Pedido</SheetTitle>
        </SheetHeader>

        {!showCheckout ? (
          <>
            <div className="py-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adicione itens do cardápio
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-secondary/50 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.product.type} • {item.product.weight}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => updateQuantity(item.product.id, 0)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => addItem(item.product)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-accent">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Observações do pedido
                    </label>
                    <Textarea
                      placeholder="Ex: sem cebola, molho à parte..."
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <SheetFooter className="border-t border-border pt-4 flex-col gap-4">
                <div className="flex justify-between items-center w-full text-lg">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-accent">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
                  onClick={() => setShowCheckout(true)}
                >
                  Continuar para entrega
                </Button>
              </SheetFooter>
            )}
          </>
        ) : (
          <CheckoutForm onBack={() => setShowCheckout(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
