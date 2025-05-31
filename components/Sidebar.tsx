"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { useRouter } from "next/navigation";

const SIDEBAR_WIDTH_COLLAPSED = 64;
const SIDEBAR_WIDTH_EXPANDED = 240;

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
    path: "/",
    badge: "3",
  },
  {
    id: "influencers",
    label: "Influencers",
    icon: <PeopleIcon />,
    path: "/",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <AnalyticsIcon />,
    path: "/",
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
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const content = (
      <ListItemButton
        onClick={() => handleNavigation(item.path)}
        sx={{
          minHeight: 48,
          justifyContent: isExpanded ? "initial" : "center",
          px: 2.5,
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
          "&:hover": {
            backgroundColor: "primary.light",
            color: "primary.contrastText",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isExpanded ? 3 : "auto",
            justifyContent: "center",
            color: "inherit",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {isExpanded && (
          <ListItemText
            primary={item.label}
            sx={{
              opacity: isExpanded ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          />
        )}
        {isExpanded && item.badge && (
          <Box
            sx={{
              backgroundColor: "error.main",
              color: "error.contrastText",
              borderRadius: "50%",
              minWidth: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {item.badge}
          </Box>
        )}
      </ListItemButton>
    );

    if (!isExpanded) {
      return (
        <Tooltip key={item.id} title={item.label} placement="right">
          <ListItem disablePadding>{content}</ListItem>
        </Tooltip>
      );
    }

    return (
      <ListItem key={item.id} disablePadding>
        {content}
      </ListItem>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Fixed collapsed sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH_COLLAPSED,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH_COLLAPSED,
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

          {/* Main Navigation - Collapsed Icons */}
          <Box sx={{ flexGrow: 1, py: 1 }}>
            <List>
              {navigationItems.map((item) => (
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
                        "&:hover": {
                          backgroundColor: "primary.light",
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
              ))}
            </List>
          </Box>

          {/* Bottom Navigation - Collapsed Icons */}
          <Box sx={{ pb: 2 }}>
            <Divider sx={{ mb: 1 }} />
            <List>
              {bottomNavigationItems.map((item) => (
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
                        "&:hover": {
                          backgroundColor: "primary.light",
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
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* Expanded overlay sidebar */}
      <Drawer
        variant="persistent"
        open={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH_EXPANDED,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH_EXPANDED,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            overflowX: "hidden",
            boxShadow: isExpanded ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
            transition: "box-shadow 0.3s ease-in-out",
            zIndex: 1300,
          },
        }}
        ModalProps={{
          keepMounted: true,
          disablePortal: true,
          hideBackdrop: true,
        }}
      >
        <Box
          sx={{ overflow: "hidden", height: "100%" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo/Brand Section */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
            <Typography
              variant="h6"
              sx={{
                ml: 2,
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              InfluencerM
            </Typography>
          </Box>

          <Divider />

          {/* Main Navigation - Expanded */}
          <Box sx={{ flexGrow: 1, py: 1 }}>
            <List>{navigationItems.map(renderNavigationItem)}</List>
          </Box>

          {/* Bottom Navigation - Expanded */}
          <Box sx={{ pb: 2 }}>
            <Divider sx={{ mb: 1 }} />
            <List>{bottomNavigationItems.map(renderNavigationItem)}</List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
