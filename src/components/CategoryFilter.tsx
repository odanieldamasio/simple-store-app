import type { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../constants/theme";

interface CategoryOption {
  id: string;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.labelTitle]}>Catetgories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => onSelectCategory(category.id)}
            >
              <Ionicons
                name={category.icon as ComponentProps<typeof Ionicons>["name"]}
                size={16}
                color={
                  isSelected
                    ? theme.colors.textLight
                    : theme.colors.textSecondary
                }
              />
              <Text style={[styles.label, isSelected && styles.labelActive]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  scrollContent: {
    paddingRight: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textSecondary,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    paddingBottom: theme.spacing.sm,
  },
  labelActive: {
    color: theme.colors.textLight,
  },
});
