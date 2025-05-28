import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define the theme colors
interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  inputBg: string;
  placeholder: string;
  white: string;
}

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
}

const lightThemeColors: ThemeColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  success: '#22C55E',
  warning: '#F97316',
  error: '#EF4444',
  background: '#F9FAFB',
  cardBg: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  inputBg: '#F3F4F6',
  placeholder: '#9CA3AF',
  white: '#FFFFFF',
};

const darkThemeColors: ThemeColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  success: '#22C55E',
  warning: '#F97316',
  error: '#EF4444',
  background: '#111827',
  cardBg: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  inputBg: '#374151',
  placeholder: '#6B7280',
  white: '#FFFFFF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    isDark,
    colors: isDark ? darkThemeColors : lightThemeColors,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}