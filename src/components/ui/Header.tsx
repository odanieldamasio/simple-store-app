import { StyleSheet, Platform, StatusBar, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../constants/theme";

export function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",

    height: Platform.OS === "ios" ? 88 : 56 + (StatusBar.currentHeight || 0),
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    textAlign: "center",
    flex: 1,
  },
});
