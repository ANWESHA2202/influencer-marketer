import Link from "next/link";
import { Button, Container, Typography, Box } from "@mui/material";
import { Home as HomeIcon, Search as SearchIcon } from "@mui/icons-material";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <Container maxWidth="md">
        <div className="text-center">
          {/* 404 Number with Gradient */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-slate-200 -z-10 blur-sm">
              404
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <Typography
              variant="h3"
              component="h2"
              className="text-2xl md:text-4xl font-bold text-slate-800 mb-4"
            >
              Oops! Page Not Found
            </Typography>
            <Typography
              variant="body1"
              className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              The page you're looking for seems to have vanished into the
              digital void. Don't worry though - even the best influencers
              sometimes take a wrong turn!
            </Typography>
          </div>

          {/* Decorative Elements */}
          <div className="relative mb-12">
            {/* Floating Icons */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 bg-primary/20 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -top-8 right-1/3 w-6 h-6 bg-secondary/20 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-4 left-1/3 w-10 h-10 bg-accent/20 rounded-full animate-bounce delay-500"></div>

            {/* Illustration Area */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-md border border-slate-200">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <SearchIcon sx={{ fontSize: 40, color: "white" }} />
                </div>
              </div>
              <Typography variant="body2" className="text-slate-500">
                🔍 Searching for content...
              </Typography>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                sx={{
                  backgroundColor: "#6366F1",
                  "&:hover": {
                    backgroundColor: "#5855EB",
                  },
                }}
              >
                Back to Home
              </Button>
            </Link>

            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outlined"
                size="large"
                className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                sx={{
                  borderColor: "#EC4899",
                  color: "#EC4899",
                  "&:hover": {
                    backgroundColor: "#EC4899",
                    borderColor: "#EC4899",
                    color: "white",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <Typography variant="body2" className="text-slate-600 mb-3">
              <strong>Need help?</strong> Here are some popular pages:
            </Typography>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/campaigns"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Campaigns
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/influencers"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Influencers
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/analytics"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Analytics
              </Link>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute top-3/4 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
