import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./src/navigation";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "./src/contexts/FavoritesContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
