import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FavoriteProduct } from "../types/FavoriteProduct";

const STORAGE_KEY = "@fakestore:favorites";

type FavoritesContextValue = {
  favorites: FavoriteProduct[];
  count: number;
  isFavorite: (id: number) => boolean;
  add: (product: FavoriteProduct) => Promise<void>;
  remove: (id: number) => Promise<void>;
  toggle: (product: FavoriteProduct) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.warn("Erro ao carregar favoritos", error);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const saveFavorites = useCallback(
    async (nextFavorites: FavoriteProduct[]) => {
      setFavorites(nextFavorites);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
    },
    [],
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const add = useCallback(
    async (product: FavoriteProduct) => {
      if (isFavorite(product.id)) return;
      await saveFavorites([...favorites, product]);
    },
    [favorites, isFavorite, saveFavorites],
  );

  const remove = useCallback(
    async (id: number) => {
      await saveFavorites(favorites.filter((item) => item.id !== id));
    },
    [favorites, saveFavorites],
  );

  const toggle = useCallback(
    async (product: FavoriteProduct) => {
      if (isFavorite(product.id)) {
        await remove(product.id);
      } else {
        await add(product);
      }
    },
    [add, isFavorite, remove],
  );

  const value = useMemo(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite,
      add,
      remove,
      toggle,
    }),
    [favorites, isFavorite, add, remove, toggle],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
