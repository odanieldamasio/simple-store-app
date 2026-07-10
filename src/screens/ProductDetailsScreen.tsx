import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/types";
import { useProductDetails } from "../hooks/useProductDetails";
import { useFavorites } from "../hooks/useFavorites";
import { theme } from "../constants/theme";
import { ProductCategoryTag } from "../components/ui/ProductCategoryTag";

export default function ProductDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();
  const { id } = route.params;

  const { product, isLoading, error, refetch } = useProductDetails(id);
  const { isFavorite, toggle } = useFavorites();
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Carregando produto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            Não foi possível carregar o produto.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Tentar novamente
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <View style={styles.titleBlock}>
                <ProductCategoryTag label={product.category} />
                <Text style={styles.title}>{product.title}</Text>
              </View>

              <View style={styles.priceWrap}>
                <Text style={styles.priceValue}>
                  ${product.price.toFixed(0)}
                </Text>
                <Text style={styles.priceUnit}>/kg</Text>
              </View>
            </View>

            <View style={styles.descriptionBlock}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text
                style={styles.description}
                numberOfLines={expanded ? undefined : 4}
              >
                {product.description}
              </Text>

              <Pressable onPress={() => setExpanded((value) => !value)}>
                <Text style={styles.readMoreText}>
                  {expanded ? "Read less" : "Read more"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButton}
          >
            <Pressable style={styles.primaryButtonInner}>
              <Ionicons
                name="cart-outline"
                size={20}
                color={theme.colors.textLight}
              />
              <Text style={styles.primaryButtonText}>Add to Cart</Text>
            </Pressable>
          </LinearGradient>

          <Pressable
            style={styles.favoriteButton}
            onPress={() =>
              toggle({
                id: Number(product.id),
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
          >
            <Ionicons
              name={isFavorite(Number(product.id)) ? "heart" : "heart-outline"}
              size={20}
              color={
                isFavorite(Number(product.id))
                  ? "#EF4444"
                  : theme.colors.textPrimary
              }
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.offWhite,
  },
  screen: {
    flex: 1,
    backgroundColor: theme.colors.offWhite,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.offWhite,
    padding: theme.spacing.xl,
  },
  imageCard: {
    height: 320,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing.lg,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    lineHeight: 24,
    marginTop: theme.spacing.sm,
  },
  priceWrap: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 84,
  },
  priceValue: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  priceUnit: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  descriptionBlock: {
    marginTop: theme.spacing.lg,
  },
  descriptionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    lineHeight: 22,
    color: theme.colors.textSecondary,
  },
  readMoreText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: `${theme.colors.offWhite}F0`,
  },
  primaryButton: {
    flex: 1,
    borderRadius: theme.radii.xl,
    height: 56,
    overflow: "hidden",
  },
  primaryButtonInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: theme.colors.textLight,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.md,
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.sizes.sm,
    textAlign: "center",
  },
  retryText: {
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
  },
});
