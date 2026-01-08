import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { finalizarPedido } from "@/lib/finalizarPedido";

interface CheckoutFormProps {
  onBack: () => void;
}

const CheckoutForm = ({ onBack }: CheckoutFormProps) => {
  const { items, totalPrice, observations, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    deliveryMethod: "entrega",
    day: "",
    time: "",
    paymentMethod: "pix",
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleDayChange = (value: string) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, day: "" }));
      return;
    }

    const selectedDate = new Date(`${value}T00:00:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      toast({
        title: "Data inválida",
        description: "Escolha um dia válido.",
        variant: "destructive",
      });
      setFormData((prev) => ({ ...prev, day: "" }));
      return;
    }

    // 1 = segunda-feira
    if (selectedDate.getDay() === 1) {
      toast({
        title: "Dia indisponível",
        description:
          "Não aceitamos pedidos para segunda-feira (terça a domingo).",
        variant: "destructive",
      });
      setFormData((prev) => ({ ...prev, day: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, day: value }));
  };

  const handleTimeChange = (value: string) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, time: "" }));
      return;
    }

    const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
    if (!timeMatch) {
      toast({
        title: "Horário inválido",
        description: "Use um horário válido (ex: 10:30).",
        variant: "destructive",
      });
      setFormData((prev) => ({ ...prev, time: "" }));
      return;
    }

    const hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);
    const totalMinutes = hours * 60 + minutes;
    const minMinutes = 9 * 60;
    const maxMinutes = 19 * 60;
    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      toast({
        title: "Horário indisponível",
        description: "Escolha um horário entre 09:00 e 19:00.",
        variant: "destructive",
      });
      setFormData((prev) => ({ ...prev, time: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, time: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEntrega = formData.deliveryMethod === "entrega";

    if (!formData.name.trim() || (isEntrega && !formData.address.trim())) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.day) {
      toast({
        title: "Data obrigatória",
        description: "Selecione o dia do pedido (terça a domingo).",
        variant: "destructive",
      });
      return;
    }

    const selectedDate = new Date(`${formData.day}T00:00:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      toast({
        title: "Data inválida",
        description: "Escolha um dia válido.",
        variant: "destructive",
      });
      return;
    }

    const weekDay = selectedDate.getDay();
    const isAllowedDay = weekDay !== 1; // 1 = segunda-feira
    if (!isAllowedDay) {
      toast({
        title: "Dia indisponível",
        description: "Atendemos de terça a domingo.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.time) {
      toast({
        title: "Horário obrigatório",
        description: "Selecione um horário entre 09:00 e 19:00.",
        variant: "destructive",
      });
      return;
    }

    const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(formData.time);
    if (!timeMatch) {
      toast({
        title: "Horário inválido",
        description: "Use um horário válido (ex: 10:30).",
        variant: "destructive",
      });
      return;
    }

    const hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);
    const totalMinutes = hours * 60 + minutes;
    const minMinutes = 9 * 60;
    const maxMinutes = 19 * 60;
    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      toast({
        title: "Horário indisponível",
        description: "Atendemos das 09:00 às 19:00.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const formaPagamentoLabel: Record<string, string> = {
      pix: "Pix",
      dinheiro: "Dinheiro",
      cartao: "Cartão",
    };

    const tipoEntrega: "Entrega" | "Retirada" = isEntrega
      ? "Entrega"
      : "Retirada";

    const pedido = {
      cliente: {
        nome: formData.name.trim(),
        ...(isEntrega ? { endereco: formData.address.trim() } : {}),
      },
      itens: items.map((item) => ({
        nome: `${item.product.name} ${item.product.weight}`,
        quantidade: item.quantity,
        preco: item.product.price,
      })),
      tipo_entrega: tipoEntrega,
      dia: formData.day,
      horario: formData.time,
      forma_pagamento:
        formaPagamentoLabel[formData.paymentMethod] ?? formData.paymentMethod,
      observacoes: observations.trim(),
    };

    try {
      await finalizarPedido(pedido);
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Erro ao enviar pedido",
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="py-4 space-y-6">
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="deliverySwitch">Entrega ou retirada *</Label>
            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {formData.deliveryMethod === "entrega"
                    ? "Entrega"
                    : "Retirada"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Deslize para alternar
                </span>
              </div>
              <Switch
                id="deliverySwitch"
                checked={formData.deliveryMethod === "retirada"}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    deliveryMethod: checked ? "retirada" : "entrega",
                    address: checked ? "" : prev.address,
                  }))
                }
              />
            </div>
          </div>

          {formData.deliveryMethod === "entrega" && (
            <div className="space-y-2">
              <Label htmlFor="address">Endereço de entrega *</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                required
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Dia do pedido *</Label>
                <Input
                  id="day"
                  type="date"
                  value={formData.day}
                  onChange={(e) => handleDayChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário *</Label>
                <Input
                  id="time"
                  type="time"
                  min="09:00"
                  max="19:00"
                  value={formData.time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Atendemos de terça a domingo, das 09:00 às 19:00.
            </p>
          </div>

          <div className="space-y-3">
            <Label>Forma de pagamento</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, paymentMethod: value }))
              }
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="cursor-pointer font-normal">
                  Pix
                </Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="dinheiro" id="dinheiro" />
                <Label
                  htmlFor="dinheiro"
                  className="cursor-pointer font-normal"
                >
                  Dinheiro
                </Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-lg">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao" className="cursor-pointer font-normal">
                  Cartão (na entrega)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold">Resumo do pedido</h4>
          <div className="text-sm text-muted-foreground">
            {formData.deliveryMethod === "entrega" ? "Entrega" : "Retirada"} •{" "}
            {formData.day || "Dia"} • {formData.time || "Horário"}
          </div>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.product.name} ({item.product.weight})
              </span>
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

        <div className="pt-4">
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
      </div>
    </form>
  );
};

export default CheckoutForm;
