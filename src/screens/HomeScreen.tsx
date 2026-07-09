import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/ui/Header";
import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen() {
  const { products, loading, refreshing, error, refresh, reload } =
    useProducts();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Simple Store" />
      <ProductList
        products={products}
        refreshing={refreshing}
        onRefresh={refresh}
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
