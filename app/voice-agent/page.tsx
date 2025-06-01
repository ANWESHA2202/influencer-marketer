"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  Chip,
  Stack,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Mic,
  MicOff,
  Phone,
  PhoneDisabled,
  GraphicEq,
  VolumeUp,
  Person2,
} from "@mui/icons-material";

// Subtle wave animation component
const SubtleWaveAnimation = ({ isActive }: { isActive: boolean }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 120,
        height: 120,
        opacity: isActive ? 0.6 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: "50%",
            animation: `subtleWave-${i} 3s infinite ease-out`,
            animationDelay: `${i * 0.5}s`,
            "@keyframes subtleWave-1": {
              "0%": {
                transform: "scale(0.8)",
                opacity: 0.8,
              },
              "100%": {
                transform: "scale(1.4)",
                opacity: 0,
              },
            },
            "@keyframes subtleWave-2": {
              "0%": {
                transform: "scale(0.8)",
                opacity: 0.6,
              },
              "100%": {
                transform: "scale(1.6)",
                opacity: 0,
              },
            },
            "@keyframes subtleWave-3": {
              "0%": {
                transform: "scale(0.8)",
                opacity: 0.4,
              },
              "100%": {
                transform: "scale(1.8)",
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

// Minimal floating particles
const MinimalParticles = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: 2,
            height: 2,
            backgroundColor: "primary.main",
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1,
            animation: `gentleFloat ${
              4 + Math.random() * 3
            }s infinite ease-in-out`,
            animationDelay: `${Math.random() * 3}s`,
            "@keyframes gentleFloat": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default function VoiceAgentPage() {
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const theme = useTheme();

  const agentId = process.env.NEXT_PUBLIC_VOICE_AGENT_ID;

  const conversation = useConversation({
    onConnect: () => {
      setError(null);
    },
    onDisconnect: () => {},
    onError: (error: any) => {
      console.error("Voice agent error:", error);
      setError(error.message || "An error occurred with the voice agent");
    },
    onMessage: (message: any) => {
      // setMessages((prev) => [...prev, message]);
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
      await navigator.mediaDevices.getUserMedia({ audio: true });
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
        return "Ready";
    }
  };

  if (!agentId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `radial-gradient(circle at center, ${alpha(
            theme.palette.error.main,
            0.05
          )} 0%, transparent 70%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <MinimalParticles />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in timeout={1000}>
            <Alert
              severity="error"
              sx={{
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                "& .MuiAlert-icon": {
                  color: theme.palette.error.main,
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Configuration Required
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Please set your{" "}
                <code
                  style={{
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}
                >
                  NEXT_PUBLIC_VOICE_AGENT_ID
                </code>{" "}
                environment variable.
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: alpha(theme.palette.common.black, 0.05),
                  p: 2,
                  borderRadius: 1,
                  fontSize: "0.875rem",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  overflow: "auto",
                }}
              >
                NEXT_PUBLIC_VOICE_AGENT_ID=your_agent_id_here
              </Box>
            </Alert>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `radial-gradient(circle at center, ${alpha(
          theme.palette.primary.main,
          0.03
        )} 0%, ${alpha(
          theme.palette.secondary.main,
          0.02
        )} 50%, transparent 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MinimalParticles />

      <Container
        maxWidth="sm"
        sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        {/* Influency Logo */}
        <Fade in timeout={800}>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.background.paper,
                  0.8
                )}, ${alpha(theme.palette.background.paper, 0.4)})`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 8px 32px ${alpha(
                  theme.palette.common.black,
                  0.08
                )}`,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 16px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                }}
              >
                <Person2 sx={{ fontSize: 24, color: "white" }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: 0.5,
                }}
              >
                Influency
              </Typography>
            </Box>
          </Box>
        </Fade>

        <Fade in timeout={1000}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Voice Agent
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 300,
                mb: 3,
              }}
            >
              AI-powered conversation assistant
            </Typography>
            <Zoom in timeout={1500}>
              <Chip
                label={getStatusText()}
                color={getStatusColor()}
                variant="outlined"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  boxShadow:
                    conversation.status === "connected"
                      ? `0 0 12px ${alpha(theme.palette.success.main, 0.3)}`
                      : "none",
                }}
              />
            </Zoom>
          </Box>
        </Fade>

        {error && (
          <Fade in>
            <Alert
              severity="error"
              sx={{
                mb: 4,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Fade>
        )}

        <Zoom in timeout={1200}>
          <Box sx={{ mb: 6 }}>
            {/* Central Voice Interface */}
            <Box
              sx={{
                position: "relative",
                width: 160,
                height: 160,
                margin: "0 auto 4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Main Circle */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background:
                    conversation.status === "connected"
                      ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    conversation.status === "connected"
                      ? `0 8px 32px ${alpha(theme.palette.success.main, 0.3)}`
                      : `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: "all 0.5s ease",
                  cursor:
                    conversation.status !== "connected" ? "pointer" : "default",
                  position: "relative",
                  zIndex: 10,
                  "&:hover":
                    conversation.status !== "connected"
                      ? {
                          transform: "scale(1.05)",
                          boxShadow: `0 12px 40px ${alpha(
                            theme.palette.primary.main,
                            0.3
                          )}`,
                        }
                      : {},
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (conversation.status !== "connected") {
                    handleStartConversation();
                  }
                }}
              >
                {conversation.status === "connected" ? (
                  <GraphicEq
                    sx={{
                      fontSize: 48,
                      color: "white",
                      animation: conversation.isSpeaking
                        ? "pulse 1.5s infinite"
                        : "none",
                      "@keyframes pulse": {
                        "0%, 100%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.1)" },
                      },
                    }}
                  />
                ) : (
                  <Phone sx={{ fontSize: 48, color: "white" }} />
                )}
              </Box>

              <SubtleWaveAnimation isActive={conversation.isSpeaking} />
            </Box>

            {/* Status Message */}
            {conversation.status === "connected" ? (
              <Fade in>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "success.main", mb: 1 }}
                  >
                    Connected
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {conversation.isSpeaking
                      ? "Agent is speaking..."
                      : "Listening..."}
                  </Typography>
                  {conversation.isSpeaking && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 1,
                        gap: 0.5,
                      }}
                    >
                      {[1, 2, 3].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "success.main",
                            animation: `dot-pulse 1.5s infinite ease-in-out`,
                            animationDelay: `${i * 0.2}s`,
                            "@keyframes dot-pulse": {
                              "0%, 80%, 100%": { opacity: 0.3 },
                              "40%": { opacity: 1 },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Fade>
            ) : (
              <Fade in>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Ready to Connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click the circle above to start
                  </Typography>
                </Box>
              </Fade>
            )}

            {/* Control Buttons */}
            {conversation.status === "connected" && (
              <Fade in>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={isMuted ? <MicOff /> : <Mic />}
                    onClick={toggleMute}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      borderColor: "success.main",
                      color: "success.main",
                      "&:hover": {
                        borderColor: "success.dark",
                        backgroundColor: alpha(
                          theme.palette.success.main,
                          0.05
                        ),
                      },
                    }}
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PhoneDisabled />}
                    onClick={handleEndConversation}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      backgroundColor: "error.main",
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                  >
                    End Call
                  </Button>
                </Stack>
              </Fade>
            )}
          </Box>
        </Zoom>

        {/* Minimal Tips */}
        <Fade in timeout={1500}>
          <Box
            sx={{
              mt: 8,
              p: 3,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              <VolumeUp sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }} />
              Ensure microphone access is enabled for the best experience
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
