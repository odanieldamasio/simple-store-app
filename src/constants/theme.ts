export const theme = {
  colors: {
    // Marca
    primary: "#007AFF",
    secondary: "#5856D6",

    // Fundo
    background: "#F5F5F5",
    offWhite: "#F8F9FB",
    surface: "#FFFFFF",
    surfaceSecondary: "#FAFAFA",
    border: "#EAEAEA",

    // Texto
    textPrimary: "#1A1A1A",
    textSecondary: "#666666",
    textMuted: "#999999",
    textLight: "#FFFFFF",

    // Estados
    success: "#34C759",
    danger: "#FF3B30",
    warning: "#FF9500",

    // Extras
    overlay: "rgba(0, 0, 0, 0.3)",
    shadow: "#000000",
    skeleton: "#EFEFEF",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    full: 9999,
  },

  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      display: 32,
    },

    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    md: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },

    lg: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 5,
    },
  },
} as const;

export type ThemeType = typeof theme;
