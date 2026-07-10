import {
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../constants/theme";
import { useFavorites } from "../../hooks/useFavorites";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Simple Store" }: HeaderProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { count } = useFavorites();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.label}>Endereço de entrega</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#F59E0B" />
            <Text style={styles.locationText}>São Paulo, Brasil</Text>
          </View>
        </View>

        <Pressable
          style={styles.favoriteButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
          {count > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 8 : StatusBar.currentHeight || 8,
    paddingBottom: 12,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  favoriteButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
