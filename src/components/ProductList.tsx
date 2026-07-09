import { FlatList, RefreshControl, StyleSheet } from "react-native";

import { ProductCard } from "./ProductCard";
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  refreshing: boolean;
  onRefresh: () => void;
}

export function ProductList({ products, refreshing, onRefresh }: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 8,
    gap: 8,
  },
  row: {
    gap: 8,
  },
});
