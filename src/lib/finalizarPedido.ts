export interface PedidoPayload {
  cliente: {
    nome: string;
    endereco?: string;
  };
  itens: Array<{
    nome: string;
    quantidade: number;
    preco: number;
  }>;
  tipo_entrega: "Entrega" | "Retirada";
  dia: string;
  horario: string;
  forma_pagamento: string;
  observacoes?: string;
}

export async function finalizarPedido(pedido: PedidoPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

  if (!webhookUrl) {
    throw new Error("VITE_N8N_WEBHOOK_URL não configurada");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // ignore
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : "Erro ao enviar pedido";
    throw new Error(message);
  }

  const link =
    typeof data === "object" && data !== null
      ? (data as { link?: unknown; whatsappUrl?: unknown }).link ??
        (data as { link?: unknown; whatsappUrl?: unknown }).whatsappUrl
      : undefined;
  if (typeof link === "string" && link.length > 0) {
    window.location.href = link;
    return;
  }

  throw new Error("Link não recebido");
}
