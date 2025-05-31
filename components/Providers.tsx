"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "../context/theme/mui-theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../lib/queryClient";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import PageTransition from "./PageTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <AuthProvider>
            <PageTransition>{children}</PageTransition>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
