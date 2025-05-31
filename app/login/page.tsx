"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLogging(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect to home or dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center px-16">
        <div>
          <div className="text-white text-xl font-semibold mb-2">● Flee</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back!
            <br />
            Let's Keep Your Business Running
          </h1>
          <p className="mb-6 text-lg text-blue-200">
            Manage and sell seamlessly - online, offline, and everywhere in
            between.
          </p>
          <blockquote className="italic text-sm text-blue-300 mt-8">
            "If you do build a great experience, customers tell each other about
            that. Word of mouth is very powerful!!"
            <br />
            <span className="block mt-2 font-bold text-white">Jeff Bezos</span>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Login to your account</h2>
          <p className="text-sm mb-6">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              className="normal-case"
            >
              Continue with Google
            </Button>
          </div>

          <div className="flex items-center my-6">
            <Divider className="flex-1" />
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <Divider className="flex-1" />
          </div>

          {/* Email/Password */}
          <div className="space-y-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ marginTop: "1em" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right text-sm mt-2 text-blue-600 cursor-pointer">
            Forgot password?
          </div>
          <div
            className="text-center text-sm mt-2 "
            style={{ color: theme.palette.error.main }}
          >
            {error}
          </div>
          <Button
            variant="contained"
            fullWidth
            className="mt-6 bg-blue-700 hover:bg-blue-800 normal-case"
            sx={{ marginTop: "1em" }}
            onClick={handleLogin}
          >
            {isLogging ? (
              <CircularProgress sx={{ color: "#FFFFFF" }} size={"1.2em"} />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
