import { StyleSheet, Text } from "react-native";

import { theme } from "../../constants/theme";

interface ProductCategoryTagProps {
  label: string;
}

export function ProductCategoryTag({ label }: ProductCategoryTagProps) {
  return <Text style={styles.category}>{label}</Text>;
}

const styles = StyleSheet.create({
  category: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.full,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textSecondary,
    textTransform: "capitalize",
  },
});
