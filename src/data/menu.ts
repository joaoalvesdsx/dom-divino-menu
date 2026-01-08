export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  weight: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'parmegiana', name: 'Parmegianas', description: 'Deliciosas parmegianas empanadas com queijo derretido' },
  { id: 'escondidinho', name: 'Escondidinhos', description: 'Cremosos escondidinhos com purê de mandioca' },
  { id: 'lasanha', name: 'Lasanhas', description: 'Lasanhas em camadas com molho especial' },
  { id: 'panqueca', name: 'Panquecas', description: 'Panquecas recheadas feitas com carinho' },
];

export const products: Product[] = [
  // Parmegianas
  { id: 'parm-carne-450', name: 'Parmegiana de Carne', category: 'parmegiana', type: 'Carne', weight: '450g', price: 35.00 },
  { id: 'parm-carne-750', name: 'Parmegiana de Carne', category: 'parmegiana', type: 'Carne', weight: '750g', price: 55.00 },
  { id: 'parm-frango-450', name: 'Parmegiana de Frango', category: 'parmegiana', type: 'Frango', weight: '450g', price: 32.00 },
  { id: 'parm-frango-750', name: 'Parmegiana de Frango', category: 'parmegiana', type: 'Frango', weight: '750g', price: 50.00 },
  
  // Escondidinhos
  { id: 'escond-carne-500', name: 'Escondidinho de Carne', category: 'escondidinho', type: 'Carne', weight: '500g', price: 28.00 },
  { id: 'escond-carne-1kg', name: 'Escondidinho de Carne', category: 'escondidinho', type: 'Carne', weight: '1kg', price: 48.00 },
  { id: 'escond-camarao-500', name: 'Escondidinho de Camarão', category: 'escondidinho', type: 'Camarão', weight: '500g', price: 38.00 },
  { id: 'escond-camarao-1kg', name: 'Escondidinho de Camarão', category: 'escondidinho', type: 'Camarão', weight: '1kg', price: 68.00 },
  
  // Lasanhas
  { id: 'lasanha-carne', name: 'Lasanha de Carne', category: 'lasanha', type: 'Carne', weight: '1kg', price: 45.00 },
  { id: 'lasanha-frango', name: 'Lasanha de Frango', category: 'lasanha', type: 'Frango', weight: '1kg', price: 42.00 },
  
  // Panquecas
  { id: 'panqueca-carne', name: 'Panqueca de Carne', category: 'panqueca', type: 'Carne', weight: '6 uni', price: 30.00 },
  { id: 'panqueca-frango', name: 'Panqueca de Frango', category: 'panqueca', type: 'Frango', weight: '6 uni', price: 28.00 },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};
