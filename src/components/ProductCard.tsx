import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../hooks/useFavorites";
import { Product } from "../types/Product";
import { theme } from "../constants/theme";

interface ProductCardProps {
  product: Product;
  onPress?: (productId: string) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(Number(product.id));

  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress?.(product.id)}
      android_ripple={{ color: theme.colors.border }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <Pressable
          style={styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
            toggle({
              id: Number(product.id),
              title: product.title,
              price: product.price,
              image: product.image,
            });
          }}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={favorite ? "#EF4444" : "#111827"}
          />
        </Pressable>
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
    borderRadius: theme.radii.sm,
    overflow: "hidden",
  },

  imageContainer: {
    height: 180,
    backgroundColor: theme.colors.surfaceSecondary,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
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
