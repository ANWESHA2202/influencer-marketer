import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "../context/theme/mui-theme";
import { ThemeProvider } from "@mui/material/styles";

export const metadata: Metadata = {
  title: "Influencer Marketing Platform",
  description:
    "Connect brands with creators, track campaigns, and measure success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={lightTheme}>
          <AuthProvider>
            <CssBaseline />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
