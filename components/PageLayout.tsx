"use client";

import { Button, Typography, Box, Container } from "@mui/material";
import TabNavigation from "./TabNavigation";

export default function PageLayout() {
  return (
    <Container maxWidth="lg" className="py-8">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h2" component="h1" className="font-bold mb-2">
            Influencer Marketing Platform
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect brands with creators, track campaigns, and measure success
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary">
            Sign In
          </Button>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </div>
      </Box>

      {/* Tab Navigation Component (Client Component) */}

      <TabNavigation />

      {/* Footer */}
      <Box className="mt-12 pt-8 border-t border-divider">
        <Typography variant="body2" color="text.secondary" align="center">
          Influencer Marketing Platform - Connecting brands with creators
          worldwide
        </Typography>
      </Box>
    </Container>
  );
}
