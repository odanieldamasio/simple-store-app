import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import { useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

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
      <ProductList
        products={products}
        refreshing={refreshing}
        onRefresh={refresh}
        onProductPress={handleProductPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
});
