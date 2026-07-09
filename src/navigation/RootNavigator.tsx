import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

export const RootNavigator = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
    },
  },
  initialRouteName: "Home",
  screenOptions: {
    headerShown: false,
  },
});
