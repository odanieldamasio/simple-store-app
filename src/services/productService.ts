import { client } from "../api/client";
import { Product } from "../types/Product";
import { Category } from "../types/Category";

export async function getProducts(): Promise<Product[]> {
  const response = await client.get<Product[]>("/products");

  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await client.get<Product>(`/products/${id}`);

  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await client.get<Category[]>("/products/categories");

  return response.data;
} 

export async function getProductsByCategory(category: Category) {
  const response = await client.get<Product[]>(
    `/products/category/${category}`,
  );

  return response.data;
}
