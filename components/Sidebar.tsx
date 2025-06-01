"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  SpaceDashboardRounded as DashboardIcon,
  RocketLaunchRounded as CampaignIcon,
  GroupsRounded as PeopleIcon,
  TrendingUpRounded as AnalyticsIcon,
  TuneRounded as SettingsIcon,
  SupportAgentRounded as HelpIcon,
  MicRounded as VoiceIcon,
  AutoAwesomeRounded as BrandIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const SIDEBAR_WIDTH = 64;

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: <CampaignIcon />,
    path: "/campaigns",
    badge: "3",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPath);
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const active = isActive(item.path);

    return (
      <Tooltip key={item.id} title={item.label} placement="right">
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2.5,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              position: "relative",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: active ? "primary.main" : "transparent",
              color: active ? "primary.contrastText" : "text.primary",
              "&:hover": {
                backgroundColor: active ? "primary.dark" : "action.hover",
                color: active ? "primary.contrastText" : "primary.main",
                transform: "translateX(2px)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ListItemIcon
              title={item.label}
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: "inherit",
                "& .MuiSvgIcon-root": {
                  fontSize: 22,
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                },
              }}
            >
              {item.icon}
            </ListItemIcon>

            {/* Modern badge design */}
            {item.badge && (
              <Box
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "error.main",
                  color: "error.contrastText",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  border: "2px solid",
                  borderColor: "background.paper",
                }}
              >
                {item.badge}
              </Box>
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          overflowX: "hidden",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Box sx={{ overflow: "hidden", height: "100%" }}>
        {/* Modern Logo/Brand Section */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 64,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: 0.5,
              boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05) rotate(5deg)",
                boxShadow: "0 6px 16px rgba(6, 182, 212, 0.4)",
              },
            }}
            onClick={() => router.push("/dashboard")}
          >
            <BrandIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>

        <Divider sx={{ mx: 1.5, opacity: 0.6 }} />

        {/* Main Navigation */}
        <Box sx={{ flexGrow: 1, py: 1 }}>
          <List>{navigationItems.map(renderNavigationItem)}</List>
        </Box>
      </Box>
    </Drawer>
  );
}
