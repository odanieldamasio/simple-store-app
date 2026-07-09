import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getProductById } from "../services/productService";
import { Product } from "../types/Product";

export function useProductDetails(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetails = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 404
            ? "Produto não encontrado."
            : "Erro ao carregar detalhes.",
        );
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  return { product, isLoading, error, refetch: loadDetails };
}
