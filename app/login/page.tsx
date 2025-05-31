"use client";

import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/firebaseConfig";
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CreatorRegistrationForm from "@/components/creator-register/form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const type = useSearchParams().get("type");

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

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const resFromGoogle = await signInWithPopup(auth, provider);
      console.log(resFromGoogle, "on login");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const renderLoginForm = () => (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Login to your account</h2>
      <p className="text-sm mb-6">
        Don't have an account?{" "}
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
          onClick={handleGoogleLogin}
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
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-secondary to-primary text-white flex flex-col justify-center px-16 overflow-hidden">
        <div>
          <div className="text-white text-2xl font-bold mb-2 flex items-center">
            Influency
          </div>

          {type === "creator" ? (
            <>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome,
                <br />
                Creator!
              </h1>
              <p className="mb-6 text-lg text-white/90">
                Ready to monetize your influence? Connect with premium brands,
                showcase your creativity, and turn your passion into profit.
              </p>
              <blockquote className="italic text-sm text-white/80 mt-8">
                "Your authentic voice is your superpower. The right brand
                partnerships amplify that voice while staying true to who you
                are."
                <br />
                <span className="block mt-2 font-bold text-white">
                  — Top Creator on Influency
                </span>
              </blockquote>
            </>
          ) : type === "brand" ? (
            <>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome!
                <br />
                Ready to Scale Your Brand?
              </h1>
              <p className="mb-6 text-lg text-white/90">
                Connect with authentic creators who align with your values.
                Build meaningful partnerships that drive engagement and real
                results.
              </p>
              <blockquote className="italic text-sm text-white/80 mt-8">
                "The best brand partnerships feel natural and authentic. When
                creators genuinely love your product, their audience feels it
                too."
                <br />
                <span className="block mt-2 font-bold text-white">
                  — Marketing Director, Fortune 500
                </span>
              </blockquote>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome Back!
                <br />
                Ready to Scale Your Influence?
              </h1>
              <p className="mb-6 text-lg text-white/90">
                Connect with authentic creators and visionary brands. Build
                meaningful partnerships that drive real results.
              </p>
              <blockquote className="italic text-sm text-white/80 mt-8">
                "The best marketing doesn't feel like marketing. It feels like
                authentic connection and genuine value."
                <br />
                <span className="block mt-2 font-bold text-white">
                  — Top Creator on Influency
                </span>
              </blockquote>
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white h-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-8">
          <div className="w-full max-w-2xl">
            {type === "creator" ? (
              <CreatorRegistrationForm />
            ) : (
              renderLoginForm()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
