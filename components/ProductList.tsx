import { FlatList, StyleSheet } from 'react-native';

import { ProductCard } from './ProductCard';

export function ProductList({ products }) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      gap={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <ProductCard product={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
   content: {
    padding: 16,
  },
  row: {
    gap: 16,
  },
});
