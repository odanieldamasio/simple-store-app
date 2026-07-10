import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

export const RootNavigator = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
    },
    Favorites: {
      screen: FavoritesScreen,
    },
  },
  initialRouteName: "Home",
  screenOptions: {
    headerShown: false,
  },
});
