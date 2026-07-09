import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
    },
  },
  screenOptions: {
    headerShown: false,
    // headerShadowVisible: false,
    // headerTransparent: true,
  }
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Navigation />
        </SafeAreaProvider> 
    )
}
