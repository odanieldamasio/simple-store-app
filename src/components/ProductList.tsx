import { ReactElement } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

import { ProductCard } from "./ProductCard";
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  refreshing: boolean;
  onRefresh: () => void;
  onProductPress: (id: string) => void;
  scrollEnabled?: boolean;
  listHeaderComponent?: ReactElement | null;
}

export function ProductList({
  products,
  refreshing,
  onProductPress,
  onRefresh,
  scrollEnabled = true,
  listHeaderComponent,
}: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={listHeaderComponent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => onProductPress(item.id)} />
      )}
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
