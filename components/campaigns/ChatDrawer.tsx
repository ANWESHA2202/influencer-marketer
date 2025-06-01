import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const ChatDrawer = ({ chatData, userName = "User", open, setOpen }: any) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  const renderMessage = (msg: any) => {
    const isUser = msg.role === "user";
    const timestamp = new Date(msg.timestamp * 1000).toLocaleString();
    return (
      <ListItem
        key={msg.id}
        sx={{ justifyContent: isUser ? "flex-start" : "flex-end" }}
      >
        <Paper
          elevation={2}
          sx={{
            maxWidth: "75%",
            p: 1.5,
            borderRadius: 2,
            bgcolor: isUser ? "primary.main" : "grey.100",
            color: isUser ? "white" : "black",
          }}
        >
          <Typography variant="body2">{msg.content}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: "0.5rem", fontWeight: "500" }}
          >
            {timestamp}
          </Typography>
        </Paper>
      </ListItem>
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h6">Chat with Assistant</Typography>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          <List>
            {chatData.map(renderMessage)}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatDrawer;
