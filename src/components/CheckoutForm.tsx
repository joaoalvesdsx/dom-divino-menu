import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  onBack: () => void;
}

// Replace with your n8n webhook URL
const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';

const CheckoutForm = ({ onBack }: CheckoutFormProps) => {
  const { items, totalPrice, observations, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'pix',
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.address.trim()) {
      toast({
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const orderData = {
      customer: {
        name: formData.name.trim(),
        address: formData.address.trim(),
        paymentMethod: formData.paymentMethod,
      },
      items: items.map(item => ({
        name: item.product.name,
        type: item.product.type,
        weight: item.product.weight,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
      })),
      observations: observations.trim(),
      totalPrice,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar pedido');
      }

      const result = await response.json();
      
      if (result.whatsappUrl) {
        clearCart();
        window.location.href = result.whatsappUrl;
      } else {
        throw new Error('URL do WhatsApp não recebida');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Erro ao enviar pedido',
        description: 'Tente novamente ou entre em contato conosco.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        <Button
          type="button"
          variant="ghost"
          className="p-0 h-auto text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao carrinho
        </Button>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço de entrega *</Label>
            <Input
              id="address"
              placeholder="Rua, número, bairro"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Forma de pagamento</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="cursor-pointer font-normal">Pix</Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="dinheiro" id="dinheiro" />
                <Label htmlFor="dinheiro" className="cursor-pointer font-normal">Dinheiro</Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao" className="cursor-pointer font-normal">Cartão (na entrega)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold">Resumo do pedido</h4>
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.product.name} ({item.product.weight})</span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          {observations && (
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Obs: {observations}
            </p>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
            <span>Total:</span>
            <span className="text-accent">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5 mr-2" />
              Finalizar pelo WhatsApp
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
