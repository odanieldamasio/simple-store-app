export const theme = {
  colors: {
    // Cores de marca (Mude os hexadecimais aqui para editar o app todo)
    primary: '#007AFF',
    secondary: '#5856D6',
    
    // Cores de fundo e superfícies
    background: '#F5F5F5',
    surface: '#FFFFFF',
    border: '#EAEAEA',

    // Cores de texto
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textLight: '#FFFFFF',

    // Estados do sistema
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
  },
  
  // Opcional: Você também pode centralizar arredondamentos e fontes aqui
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
  }
} as const; // O "as const" garante que o TypeScript conheça os valores exatos de cada cor

// Exporta o tipo do tema para caso você precise tipar propriedades
export type ThemeType = typeof theme;