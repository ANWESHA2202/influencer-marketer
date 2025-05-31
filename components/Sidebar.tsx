"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Code as CodeIcon,
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
    path: "/",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: <CampaignIcon />,
    path: "/campaigns",
    badge: "3",
  },
  {
    id: "influencers",
    label: "Influencers",
    icon: <PeopleIcon />,
    path: "/influencers-management",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <AnalyticsIcon />,
    path: "/reports",
  },
  {
    id: "hooks-demo",
    label: "Hooks Demo",
    icon: <CodeIcon />,
    path: "/demo",
  },
];

const bottomNavigationItems: NavigationItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <HelpIcon />,
    path: "/help",
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
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              transition: "all 0.3s ease",
              backgroundColor: active ? "primary.main" : "transparent",
              color: active ? "primary.contrastText" : "inherit",
              "&:hover": {
                backgroundColor: active ? "primary.dark" : "primary.light",
                color: "primary.contrastText",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
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
        },
      }}
    >
      <Box sx={{ overflow: "hidden", height: "100%" }}>
        {/* Logo/Brand Section */}
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
              width: 32,
              height: 32,
              backgroundColor: "primary.main",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrastText",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            IM
          </Box>
        </Box>

        <Divider />

        {/* Main Navigation */}
        <Box sx={{ flexGrow: 1, py: 1 }}>
          <List>{navigationItems.map(renderNavigationItem)}</List>
        </Box>

        {/* Bottom Navigation */}
        <Box sx={{ pb: 2 }}>
          <Divider sx={{ mb: 1 }} />
          <List>{bottomNavigationItems.map(renderNavigationItem)}</List>
        </Box>
      </Box>
    </Drawer>
  );
}
