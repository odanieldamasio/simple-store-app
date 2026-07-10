import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/types";
import { useFavorites } from "../hooks/useFavorites";
import { useProductDetails } from "../hooks/useProductDetails";
import { theme } from "../constants/theme";
import { getProductsByCategory } from "../services/productService";
import { Product } from "../types/Product";

export default function ProductDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } = route.params;

  const { product, isLoading, error, refetch } = useProductDetails(id);
  const { isFavorite, toggle } = useFavorites();
  const [expanded, setExpanded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const currentProduct = product;
    let isActive = true;

    async function loadRelatedProducts() {
      try {
        const data = await getProductsByCategory(currentProduct.category);
        if (isActive) {
          setRelatedProducts(
            data.filter((item) => item.id !== currentProduct.id).slice(0, 4),
          );
        }
      } catch (error) {
        console.warn("Erro ao carregar produtos relacionados", error);
      }
    }

    loadRelatedProducts();

    return () => {
      isActive = false;
    };
  }, [product]);

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

  const isProductFavorite = isFavorite(Number(product.id));
  const favoritePayload = {
    id: Number(product.id),
    title: product.title,
    price: product.price,
    image: product.image,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={theme.colors.textPrimary}
            />
          </Pressable>

          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.title}
          </Text>

          <Pressable
            style={styles.iconButton}
            onPress={() => toggle(favoritePayload)}
          >
            <Ionicons
              name={isProductFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isProductFavorite ? "#EF4444" : theme.colors.textPrimary}
            />
          </Pressable>
        </View>

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
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.priceValue}>${product.price.toFixed(2)}</Text>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="sparkles-outline" size={14} color={theme.colors.primary} />
                <Text style={styles.metaChipText}>Premium</Text>
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
                  {expanded ? "Show less" : "Read more"}
                </Text>
              </Pressable>
            </View>

            {relatedProducts.length > 0 ? (
              <View style={styles.relatedSection}>
                <Text style={styles.relatedTitle}>More Products</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.relatedContent}
                >
                  {relatedProducts.map((item, index) => (
                    <View
                      key={item.id}
                      style={styles.relatedCard}
                    >
                      <Pressable
                        style={styles.relatedPressable}
                        onPress={() => navigation.navigate("ProductDetails", { id: String(item.id) })}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.relatedImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.relatedName} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={styles.relatedPrice}>${item.price.toFixed(2)}</Text>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButton}
          >
            <Pressable
              style={({ pressed }) => [
                styles.primaryButtonInner,
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons
                name="cart-outline"
                size={20}
                color={theme.colors.textLight}
              />
              <Text style={styles.primaryButtonText}>Add to Cart</Text>
            </Pressable>
          </LinearGradient>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    textAlign: "center",
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 130,
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
    borderRadius: 32,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 26,
    elevation: 4,
  },
  image: {
    width: "75%",
    height: "75%",
  },
  infoContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    lineHeight: 36,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.textPrimary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: "#5856D6",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  metaChipText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  descriptionBlock: {
    marginTop: theme.spacing.xl,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.textSecondary,
  },
  readMoreText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  relatedSection: {
    marginTop: theme.spacing.xl,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  relatedContent: {
    paddingRight: theme.spacing.sm,
  },
  relatedCard: {
    width: 132,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 12,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  relatedPressable: {
    flex: 1,
  },
  relatedImage: {
    height: 84,
    width: "100%",
    marginBottom: theme.spacing.sm,
  },
  relatedName: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    lineHeight: 18,
    marginBottom: theme.spacing.xs,
  },
  relatedPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    backgroundColor: `${theme.colors.offWhite}F0`,
  },
  primaryButton: {
    borderRadius: 24,
    height: 60,
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
    fontWeight: "700",
    fontSize: 18,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
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
