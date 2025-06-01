"use client";

import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
    handleProfileMenuClose();
  };

  const handleProfileClick = () => {
    router.push("/profile");
    handleProfileMenuClose();
  };

  const handleSettingsClick = () => {
    router.push("/settings");
    handleProfileMenuClose();
  };

  if (!user) return null;

  // Get user display name or email
  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const userEmail = user.email || "";

  // Generate avatar from user's name or email
  const getAvatarText = () => {
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return userEmail[0]?.toUpperCase() || "U";
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Notifications */}
      <IconButton
        onClick={handleNotificationOpen}
        sx={{
          color: "text.primary",
          "&:hover": { backgroundColor: "action.hover" },
        }}
      >
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* User Profile Section */}
      <Box
        onClick={handleProfileMenuOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: "8px 12px",
          borderRadius: 2,
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Avatar
          src={user.photoURL || undefined}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "primary.main",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          {getAvatarText()}
        </Avatar>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {displayName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.2 }}
          >
            {userEmail}
          </Typography>
        </Box>

        <ArrowDownIcon sx={{ fontSize: 16, color: "text.secondary" }} />
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 200,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* User Info Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {displayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userEmail}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 300,
            maxHeight: 400,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>

        <MenuItem>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              New campaign approved
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your "Summer Fashion" campaign has been approved
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Influencer application
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @fashionista_jane applied to your campaign
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Campaign performance update
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your campaign reached 1M impressions
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem sx={{ justifyContent: "center", color: "primary.main" }}>
          <Typography variant="body2">View all notifications</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
