import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./src/navigation";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { FavoritesProvider } from "./src/contexts/FavoritesContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
