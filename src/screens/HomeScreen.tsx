import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Header } from "../components/ui/Header";
import { ProductList } from "../components/ProductList";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { useProducts } from "../hooks/useProducts";
import { RootStackParamList } from "../navigation/types";
import { theme } from "../constants/theme";
import { getCategories } from "../services/productService";
import { useEffect } from "react";

export default function HomeScreen() {
  const { products, refreshing, refresh } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([
    { id: "all", label: "Todos", icon: "apps" },
  ]);

  const categoryMetadata: Record<string, { label: string; icon: string }> = {
    electronics: {
      label: "Electronics",
      icon: "laptop-outline",
    },
    jewelery: {
      label: "Jewelry",
      icon: "diamond-outline",
    },
    "men's clothing": {
      label: "Men's",
      icon: "man-outline",
    },
    "women's clothing": {
      label: "Women's",
      icon: "woman-outline",
    },
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCategories();
        const mappedCategories = response.map((category) => {
          const metadata = categoryMetadata[category] ?? {
            label: category,
            icon: "apps",
          };

          return {
            id: category,
            ...metadata,
          };
        });

        setCategories([
          { id: "all", label: "All", icon: "apps" },
          ...mappedCategories,
        ]);
      } catch (error) {
        console.warn("Erro ao carregar categorias", error);
      }
    }

    loadCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const handleProductPress = useCallback(
    (id: string) => {
      navigation.navigate("ProductDetails", { id });
    },
    [navigation],
  );

  const listHeaderComponent = (
    <>
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/banner.png")}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <View style={styles.filterSection}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Header title="Simple Store" />

      <View style={styles.listWrapper}>
        <ProductList
          products={filteredProducts}
          refreshing={refreshing}
          onRefresh={refresh}
          onProductPress={handleProductPress}
          listHeaderComponent={listHeaderComponent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.offWhite,
  },
  bannerContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  searchSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  filterSection: {
    paddingLeft: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.sm,
  },
});
