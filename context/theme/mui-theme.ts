"use client";

import { createTheme, Theme } from "@mui/material/styles";

// Professional Influencer Marketing Platform Color Palette
const colors = {
  // Core brand colors - sophisticated and trustworthy
  primary: "#06B6D4", // Cyan - data, analytics, insights
  primaryHover: "#0891B2",
  primaryPressed: "#0E7490",
  primaryLight: "#67E8F9",
  primaryMuted: "#CFFAFE",

  // Secondary brand colors - creativity and engagement
  secondary: "#3B82F6", //
  secondaryHover: "#2563EB",
  secondaryPressed: "#1D4ED8",
  secondaryLight: "#93C5FD",
  secondaryMuted: "#DBEAFE",

  // Accent colors for data and insights
  accent: "#6366F1", // Indigo - professional, trustworthy, tech-forward
  accentHover: "#4F46E5",
  accentPressed: "#4338CA",
  accentLight: "#A5B4FC",
  accentMuted: "#E0E7FF",

  // Status colors - professional and clear
  success: "#10B981", // Emerald - successful campaigns, positive metrics
  successHover: "#059669",
  successMuted: "#D1FAE5",

  warning: "#F59E0B", // Amber - pending campaigns, attention needed
  warningHover: "#D97706",
  warningMuted: "#FEF3C7",

  error: "#EF4444", // Red - failed campaigns, errors
  errorHover: "#DC2626",
  errorMuted: "#FEE2E2",

  // Neutral colors - clean and professional
  background: {
    primary: "#FFFFFF", // Pure white for main background
    secondary: "#F8FAFC", // Slate 50 - subtle background variation
    tertiary: "#F1F5F9", // Slate 100 - card backgrounds
  },

  surface: {
    primary: "#FFFFFF", // White surfaces
    secondary: "#F8FAFC", // Light gray surfaces
    elevated: "#FFFFFF", // Elevated surfaces (modals, dropdowns)
  },

  text: {
    primary: "#0F172A", // Slate 900 - main text, high contrast
    secondary: "#475569", // Slate 600 - secondary text
    tertiary: "#64748B", // Slate 500 - muted text
    inverse: "#FFFFFF", // White text on dark backgrounds
    placeholder: "#94A3B8", // Slate 400 - placeholder text
  },

  border: {
    primary: "#E2E8F0", // Slate 200 - main borders
    secondary: "#CBD5E1", // Slate 300 - emphasized borders
    focus: "#6366F1", // Primary color for focus states
  },

  // Specialized colors for influencer marketing features
  influencer: {
    tier1: "#8B5CF6", // Purple - top tier influencers
    tier2: "#06B6D4", // Cyan - mid tier influencers
    tier3: "#10B981", // Green - micro influencers
    engagement: "#EC4899", // Pink - engagement metrics
    reach: "#F59E0B", // Amber - reach metrics
  },

  // Data visualization colors
  chart: {
    primary: "#6366F1",
    secondary: "#EC4899",
    tertiary: "#06B6D4",
    quaternary: "#10B981",
    quinary: "#F59E0B",
    senary: "#8B5CF6",
  },

  // Interactive states
  hover: "rgba(99, 102, 241, 0.04)", // Primary with low opacity
  pressed: "rgba(99, 102, 241, 0.08)",
  selected: "rgba(99, 102, 241, 0.12)",
  disabled: "#F1F5F9",

  // Shadows and overlays
  shadow: {
    light: "rgba(15, 23, 42, 0.04)",
    medium: "rgba(15, 23, 42, 0.08)",
    heavy: "rgba(15, 23, 42, 0.16)",
  },
  overlay: "rgba(15, 23, 42, 0.60)",
};

// Light theme optimized for influencer marketing platform
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      dark: colors.primaryPressed,
      light: colors.primaryLight,
      contrastText: colors.text.inverse,
    },
    secondary: {
      main: colors.secondary,
      dark: colors.secondaryPressed,
      light: colors.secondaryLight,
      contrastText: colors.text.inverse,
    },
    error: {
      main: colors.error,
      dark: colors.errorHover,
      light: colors.errorMuted,
      contrastText: colors.text.inverse,
    },
    warning: {
      main: colors.warning,
      dark: colors.warningHover,
      light: colors.warningMuted,
      contrastText: colors.text.primary,
    },
    success: {
      main: colors.success,
      dark: colors.successHover,
      light: colors.successMuted,
      contrastText: colors.text.inverse,
    },
    background: {
      default: colors.background.primary,
      paper: colors.surface.primary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.tertiary,
    },
    divider: colors.border.primary,
    action: {
      active: colors.text.primary,
      hover: colors.hover,
      selected: colors.selected,
      disabled: colors.disabled,
      disabledBackground: colors.disabled,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface.primary,
          borderColor: colors.border.primary,
          boxShadow: `0 1px 3px ${colors.shadow.light}, 0 1px 2px ${colors.shadow.light}`,
          borderRadius: "12px",
          border: `1px solid ${colors.border.primary}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: "12px",
        },
        elevation1: {
          boxShadow: `0 1px 3px ${colors.shadow.light}, 0 1px 2px ${colors.shadow.light}`,
        },
        elevation2: {
          boxShadow: `0 4px 6px ${colors.shadow.light}, 0 2px 4px ${colors.shadow.light}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.875rem",
          padding: "10px 20px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: `0 4px 6px ${colors.shadow.medium}`,
            backgroundColor: colors.primaryHover,
          },
          "&:active": {
            backgroundColor: colors.primaryPressed,
          },
        },
        outlined: {
          borderColor: colors.border.secondary,
          "&:hover": {
            backgroundColor: colors.hover,
            borderColor: colors.primary,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: colors.background.primary,
            "& fieldset": {
              borderColor: colors.border.primary,
            },
            "&:hover fieldset": {
              borderColor: colors.border.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
              borderWidth: "1px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: colors.primaryMuted,
          color: colors.primaryPressed,
        },
        colorSecondary: {
          backgroundColor: colors.secondaryMuted,
          color: colors.secondaryPressed,
        },
      },
    },
  },
  typography: {
    fontFamily:
      "var(--font-geist-sans), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      color: colors.text.primary,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.875rem",
      lineHeight: 1.3,
      color: colors.text.primary,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: colors.text.primary,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: colors.text.primary,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: colors.text.tertiary,
    },
  },
});
