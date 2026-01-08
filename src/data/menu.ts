import parmegianaImg from "@/assets/parmegiana.jpg";
import escondidinhoImg from "@/assets/escondidinho.jpg";
import lasanhaImg from "@/assets/lasanha.jpg";
import panquecaImg from "@/assets/panqueca.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  weight: string;
  price: number;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "parmegiana",
    name: "Parmegianas",
    description: "Deliciosas parmegianas empanadas com queijo derretido",
  },
  {
    id: "escondidinho",
    name: "Escondidinhos",
    description: "Cremosos escondidinhos com purê de mandioca",
  },
  {
    id: "lasanha",
    name: "Lasanhas",
    description: "Lasanhas em camadas com molho especial",
  },
  {
    id: "panqueca",
    name: "Panquecas",
    description: "Panquecas recheadas feitas com carinho",
  },
];

export const products: Product[] = [
  // Parmegianas
  {
    id: "parm-carne-450",
    name: "Parmegiana de Carne",
    category: "parmegiana",
    type: "Carne",
    weight: "450g",
    price: 35.0,
    image: parmegianaImg,
    description: "Empanada crocante com molho de tomate e queijo derretido.",
  },
  {
    id: "parm-carne-750",
    name: "Parmegiana de Carne",
    category: "parmegiana",
    type: "Carne",
    weight: "750g",
    price: 55.0,
    image: parmegianaImg,
    description: "Empanada crocante com molho de tomate e queijo derretido.",
  },
  {
    id: "parm-frango-450",
    name: "Parmegiana de Frango",
    category: "parmegiana",
    type: "Frango",
    weight: "450g",
    price: 32.0,
    image: parmegianaImg,
    description: "Empanada crocante com molho de tomate e queijo derretido.",
  },
  {
    id: "parm-frango-750",
    name: "Parmegiana de Frango",
    category: "parmegiana",
    type: "Frango",
    weight: "750g",
    price: 50.0,
    image: parmegianaImg,
    description: "Empanada crocante com molho de tomate e queijo derretido.",
  },

  // Escondidinhos
  {
    id: "escond-carne-500",
    name: "Escondidinho de Carne",
    category: "escondidinho",
    type: "Carne",
    weight: "500g",
    price: 28.0,
    image: escondidinhoImg,
    description:
      "Purê de mandioca cremoso com recheio bem temperado e gratinado.",
  },
  {
    id: "escond-carne-1kg",
    name: "Escondidinho de Carne",
    category: "escondidinho",
    type: "Carne",
    weight: "1kg",
    price: 48.0,
    image: escondidinhoImg,
    description:
      "Purê de mandioca cremoso com recheio bem temperado e gratinado.",
  },
  {
    id: "escond-camarao-500",
    name: "Escondidinho de Camarão",
    category: "escondidinho",
    type: "Camarão",
    weight: "500g",
    price: 38.0,
    image: escondidinhoImg,
    description: "Purê de mandioca cremoso com camarão e gratinado no forno.",
  },
  {
    id: "escond-camarao-1kg",
    name: "Escondidinho de Camarão",
    category: "escondidinho",
    type: "Camarão",
    weight: "1kg",
    price: 68.0,
    image: escondidinhoImg,
    description: "Purê de mandioca cremoso com camarão e gratinado no forno.",
  },

  // Lasanhas
  {
    id: "lasanha-carne",
    name: "Lasanha de Carne",
    category: "lasanha",
    type: "Carne",
    weight: "1kg",
    price: 45.0,
    image: lasanhaImg,
    description: "Camadas generosas com molho especial e bastante queijo.",
  },
  {
    id: "lasanha-frango",
    name: "Lasanha de Frango",
    category: "lasanha",
    type: "Frango",
    weight: "1kg",
    price: 42.0,
    image: lasanhaImg,
    description: "Camadas generosas com molho especial e bastante queijo.",
  },

  // Panquecas
  {
    id: "panqueca-carne",
    name: "Panqueca de Carne",
    category: "panqueca",
    type: "Carne",
    weight: "6 uni",
    price: 30.0,
    image: panquecaImg,
    description:
      "Panquecas recheadas, cobertas com molho e finalizadas no forno.",
  },
  {
    id: "panqueca-frango",
    name: "Panqueca de Frango",
    category: "panqueca",
    type: "Frango",
    weight: "6 uni",
    price: 28.0,
    image: panquecaImg,
    description:
      "Panquecas recheadas, cobertas com molho e finalizadas no forno.",
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};
