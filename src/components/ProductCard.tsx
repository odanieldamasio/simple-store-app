import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Product } from "../types/Product";
import { theme } from "../constants/theme";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: theme.colors.border }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    overflow: "hidden",
  },

  imageContainer: {
    height: 180,
    backgroundColor: theme.colors.surfaceSecondary,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: theme.spacing.lg,
  },

  category: {
    alignSelf: "flex-start",

    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,

    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.full,

    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textSecondary,
    textTransform: "capitalize",
  },

  title: {
    minHeight: 44,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },

  price: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
});
