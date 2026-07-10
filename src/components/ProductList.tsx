import { ReactElement } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import { ProductCard } from "./ProductCard";
import { Product } from "../types/Product";
import { theme } from "../constants/theme";

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
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      }
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
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
    flexGrow: 1,
  },
  row: {
    gap: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
