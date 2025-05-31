"use client";
import { useAuth } from "@/context/AuthContext";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Container,
  Grid,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signup");
    }
  }, [loading, user, router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return null;

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h1">Hello World</Typography>
    </Container>
  );
}
