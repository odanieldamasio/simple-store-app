import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/types";
import { useProducts } from "../hooks/useProducts";
import { useProductDetails } from "../hooks/useProductDetails";
import { theme } from "../constants/theme";

export default function ProductDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();

  const { productId } = route.params;

  const { product, loading, error, reload } = useProductDetails(productId);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error || !product) {
  //   return (
  //     <ErrorState
  //       message="Não foi possível carregar o produto."
  //       onRetry={reload}
  //     />
  //   );
  // }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.rating}>
          <Text>⭐ {product.rating.rate}</Text>

          <Text>({product.rating.count} avaliações)</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>

        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textPrimary,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.sizes.sm,
  }
});
