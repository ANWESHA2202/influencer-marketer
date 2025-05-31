"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  Alert,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console and any error reporting service
    console.error("🚨 Error Boundary caught an error:", error);
    console.error("Error Info:", errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box className="p-6 max-w-2xl mx-auto">
          <Card>
            <CardContent>
              <Alert severity="error" className="mb-4">
                <Typography variant="h6" className="mb-2">
                  🚨 Something went wrong
                </Typography>
                <Typography variant="body2" className="mb-3">
                  An unexpected error occurred. Don't worry, your data is safe.
                  You can try refreshing the page or contact support if the
                  problem persists.
                </Typography>
              </Alert>

              <Box className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    variant="contained"
                    onClick={this.handleReset}
                    color="primary"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => window.location.reload()}
                    color="secondary"
                  >
                    Refresh Page
                  </Button>
                </div>

                {process.env.NODE_ENV === "development" && this.state.error && (
                  <Box className="mt-4">
                    <Typography variant="subtitle2" className="mb-2">
                      Error Details (Development Only):
                    </Typography>
                    <Box className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto max-h-48">
                      <Typography variant="body2" className="text-red-600 mb-2">
                        <strong>Error:</strong> {this.state.error.message}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        <strong>Stack:</strong>
                      </Typography>
                      <pre className="text-xs whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
