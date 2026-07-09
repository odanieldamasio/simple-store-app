import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

export const RootNavigator = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
    },
  },
  screenOptions: {
    headerShown: false,
  },
});
