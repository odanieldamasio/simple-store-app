import { useCallback, useState, useEffect } from "react";
import { Product } from "../types/Product";
import { getProducts } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setError(false);
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(true);
    }
  }, []);
  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);

      await loadProducts();
    } finally {
      setRefreshing(false);
    }
  }, [loadProducts]);

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);

        await loadProducts();
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [loadProducts]);

  return {
    products,
    loading,
    refreshing,
    error,
    refresh,
    reload: loadProducts,
  };
}
