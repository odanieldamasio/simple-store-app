import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../components/ui/Header";
import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import { useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { theme } from "../constants/theme";

export default function HomeScreen() {
  const { products, loading, refreshing, error, refresh, reload } =
    useProducts();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProductPress = useCallback(
    (id: string) => {
      navigation.navigate("ProductDetails", { id });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Header title="Simple Store" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/banner.png")}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.listWrapper}>
          <ProductList
            products={products}
            refreshing={refreshing}
            onRefresh={refresh}
            onProductPress={handleProductPress}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.offWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  bannerContainer: {
    paddingHorizontal: theme.spacing.lg,
    // paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  listWrapper: {
    paddingHorizontal: theme.spacing.sm,
  },
});
