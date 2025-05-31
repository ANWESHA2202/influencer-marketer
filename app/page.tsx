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

export default function Home() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

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
          {!user ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/signup")}
            >
              Sign In
            </Button>
          ) : (
            <p>user </p>
          )}
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </div>
      </Box>

      {/* Hero Section with New Colors */}
      <div className="mb-8 p-6 bg-primary text-text-inverse rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3">
            Discover Top-Tier Influencers
          </h2>
          <p className="text-lg mb-4 opacity-90">
            Access our database of verified creators across all social platforms
          </p>
          <div className="flex gap-3">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              Browse Influencers
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light opacity-20 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-20 rounded-full -ml-12 -mb-12"></div>
      </div>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Influencer Discovery Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={1} className="p-6 mb-6">
            <Typography variant="h5" className="mb-4 flex items-center gap-2">
              🔍 Influencer Discovery
            </Typography>

            <Box className="space-y-4">
              <div className="flex gap-3">
                <TextField
                  fullWidth
                  label="Search influencers"
                  variant="outlined"
                  placeholder="Fashion, beauty, tech..."
                  className="flex-1"
                />
                <Button variant="contained" color="primary" className="px-6">
                  Search
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Chip
                  label="Fashion"
                  className="bg-influencer-tier1 text-text-inverse"
                  sx={{ backgroundColor: "#8B5CF6", color: "white" }}
                />
                <Chip
                  label="Beauty"
                  className="bg-secondary text-text-inverse"
                  color="secondary"
                />
                <Chip
                  label="Tech"
                  className="bg-accent text-text-inverse"
                  sx={{ backgroundColor: "#06B6D4", color: "white" }}
                />
                <Chip
                  label="Lifestyle"
                  className="bg-success text-text-inverse"
                  color="success"
                />
              </div>
            </Box>
          </Paper>

          {/* Sample Influencer Cards */}
          <Grid container spacing={3}>
            {[
              {
                name: "Sarah Johnson",
                handle: "@sarahjstyle",
                followers: "2.4M",
                engagement: "4.2%",
                tier: "Mega",
                category: "Fashion",
                avatar: "SJ",
                tierColor: "bg-influencer-tier1",
              },
              {
                name: "Mike Chen",
                handle: "@techmikechen",
                followers: "890K",
                engagement: "6.1%",
                tier: "Macro",
                category: "Tech",
                avatar: "MC",
                tierColor: "bg-influencer-tier2",
              },
              {
                name: "Emma Davis",
                handle: "@emmaeats",
                followers: "156K",
                engagement: "8.3%",
                tier: "Micro",
                category: "Food",
                avatar: "ED",
                tierColor: "bg-influencer-tier3",
              },
            ].map((influencer, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar
                        sx={{
                          bgcolor: "#6366F1",
                          width: 48,
                          height: 48,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      >
                        {influencer.avatar}
                      </Avatar>
                      <div className="flex-1">
                        <Typography
                          variant="h6"
                          className="text-sm font-semibold"
                        >
                          {influencer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {influencer.handle}
                        </Typography>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Followers</span>
                        <span className="font-semibold">
                          {influencer.followers}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Engagement</span>
                        <span className="font-semibold text-influencer-engagement">
                          {influencer.engagement}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Chip
                        label={influencer.tier}
                        size="small"
                        className={`${influencer.tierColor} text-text-inverse text-xs`}
                        sx={{
                          backgroundColor:
                            influencer.tier === "Mega"
                              ? "#8B5CF6"
                              : influencer.tier === "Macro"
                              ? "#06B6D4"
                              : "#10B981",
                          color: "white",
                          fontSize: "0.75rem",
                        }}
                      />
                      <Button size="small" variant="outlined">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Campaign Analytics Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} className="p-6 mb-4">
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              📊 Campaign Performance
            </Typography>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body2" color="text.secondary">
                    Reach
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    2.4M
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#F1F5F9",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#F59E0B",
                    },
                  }}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body2" color="text.secondary">
                    Engagement
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    156K
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#F1F5F9",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#EC4899",
                    },
                  }}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body2" color="text.secondary">
                    Conversions
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    3.2K
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={45}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#F1F5F9",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </div>
            </div>

            <Divider className="my-4" />

            <div className="text-center">
              <Typography variant="h4" className="font-bold text-primary mb-1">
                $24.5K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Campaign ROI
              </Typography>
            </div>
          </Paper>

          {/* Quick Actions */}
          <Paper elevation={1} className="p-6">
            <Typography variant="h6" className="mb-4">
              Quick Actions
            </Typography>
            <div className="space-y-3">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="justify-start"
              >
                Create Campaign
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className="justify-start"
              >
                Browse Creators
              </Button>
              <Button
                fullWidth
                variant="outlined"
                className="justify-start"
                sx={{
                  borderColor: "#06B6D4",
                  color: "#06B6D4",
                  "&:hover": {
                    backgroundColor: "rgba(6, 182, 212, 0.04)",
                    borderColor: "#0891B2",
                  },
                }}
              >
                View Analytics
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>

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
