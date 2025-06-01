"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import {
  Mic,
  MicOff,
  Settings,
  Phone,
  PhoneDisabled,
} from "@mui/icons-material";

export default function VoiceAgentPage() {
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const agentId = process.env.NEXT_PUBLIC_VOICE_AGENT_ID;

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
    },
    onError: (error: any) => {
      console.error("Voice agent error:", error);
      setError(error.message || "An error occurred with the voice agent");
    },
    onMessage: (message: any) => {
      console.log("Message received:", message);
    },
  });

  useEffect(() => {
    if (!agentId) {
      setError(
        "Voice Agent ID not found. Please set NEXT_PUBLIC_VOICE_AGENT_ID in your environment variables."
      );
    }
  }, [agentId]);

  const handleStartConversation = useCallback(async () => {
    if (!agentId) {
      setError("Voice Agent ID not configured");
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation
      await conversation.startSession({
        agentId: agentId,
      });
    } catch (error: any) {
      console.error("Failed to start conversation:", error);
      setError(error.message || "Failed to start conversation");
    }
  }, [conversation, agentId]);

  const handleEndConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error: any) {
      console.error("Failed to end conversation:", error);
      setError(error.message || "Failed to end conversation");
    }
  }, [conversation]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    // Note: Muting functionality would need to be implemented based on the SDK's capabilities
  }, [isMuted]);

  const getStatusColor = () => {
    switch (conversation.status) {
      case "connected":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusText = () => {
    switch (conversation.status) {
      case "connected":
        return "Connected";
      default:
        return "Disconnected";
    }
  };

  if (!agentId) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Configuration Required
          </Typography>
          <Typography>
            Please set your <code>NEXT_PUBLIC_VOICE_AGENT_ID</code> environment
            variable with your Eleven Labs Voice Agent ID.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            You can create a .env file in your project root with:
          </Typography>
          <Box
            component="pre"
            sx={{
              bgcolor: "grey.100",
              p: 2,
              mt: 1,
              borderRadius: 1,
              fontSize: "0.875rem",
            }}
          >
            NEXT_PUBLIC_VOICE_AGENT_ID=your_agent_id_here
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Voice Agent
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Powered by Eleven Labs
        </Typography>
        <Chip
          label={getStatusText()}
          color={getStatusColor()}
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center" }}>
          {conversation.status !== "connected" ? (
            <Card sx={{ mb: 3, bgcolor: "background.default" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Ready to Connect
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Click the button below to start your voice conversation
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Phone />}
                  onClick={handleStartConversation}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                  }}
                >
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                mb: 3,
                bgcolor: "success.light",
                color: "success.contrastText",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Voice Agent Active
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  You are now connected to the voice agent. Speak naturally!
                </Typography>
                {conversation.isSpeaking && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, fontStyle: "italic" }}
                  >
                    🎤 Agent is speaking...
                  </Typography>
                )}
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    startIcon={isMuted ? <MicOff /> : <Mic />}
                    onClick={toggleMute}
                    sx={{
                      borderColor: "success.contrastText",
                      color: "success.contrastText",
                      "&:hover": {
                        borderColor: "success.contrastText",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<PhoneDisabled />}
                    onClick={handleEndConversation}
                    sx={{ px: 3 }}
                  >
                    End Call
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>
      </Paper>

      <Paper
        elevation={1}
        sx={{ p: 3, borderRadius: 3, bgcolor: "background.default" }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Settings fontSize="small" />
          Tips for Best Experience
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <Typography component="li" sx={{ mb: 1 }}>
            Ensure your microphone is enabled and working
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Speak clearly and at a normal pace
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Use a quiet environment for better voice recognition
          </Typography>
          <Typography component="li">
            Allow microphone permissions when prompted
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
