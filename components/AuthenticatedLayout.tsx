"use client";

import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import ErrorBoundary from "./ErrorBoundary";

const SIDEBAR_WIDTH = 64; // Fixed collapsed sidebar width

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export default function AuthenticatedLayout({
  children,
  title,
  maxWidth = "xl",
}: AuthenticatedLayoutProps) {
  const { user, loading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, don't render the authenticated layout
  if (!user) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      {/* Sidebar - Hidden on mobile */}
      {!isMobile && <Sidebar />}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "background.default",
          width: !isMobile ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
        }}
      >
        {/* Top Navigation Bar */}
        <AppBar
          position="sticky"
          elevation={1}
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            borderRadius: 0,
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}
          >
            {/* Page Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {title && (
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>

            {/* User Profile Section */}
            <UserProfile />
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            overflow: "auto",
          }}
        >
          <ErrorBoundary>
            {maxWidth ? (
              <Container maxWidth={maxWidth} sx={{ px: { xs: 0, sm: 2 } }}>
                {children}
              </Container>
            ) : (
              children
            )}
          </ErrorBoundary>
        </Box>
      </Box>

      {/* Mobile Bottom Navigation (Optional - can be added later) */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            zIndex: theme.zIndex.appBar,
            // Mobile navigation can be implemented here
            display: "none", // Hidden for now
          }}
        >
          {/* Mobile navigation items */}
        </Box>
      )}
    </Box>
  );
}
