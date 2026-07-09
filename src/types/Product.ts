export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  image: string;
}
