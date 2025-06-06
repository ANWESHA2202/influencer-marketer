"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { TextField, Button, Divider, useTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import BrandInfoStepForm from "@/components/OnBoardingFlow";
import { useCreate } from "@/hooks";
import { URLMapping } from "@/lib/constants";
import { axiosWithAuth } from "@/lib/axios";
import OnBoardingFlow from "@/components/OnBoardingFlow";

function generateUsername(email: string) {
  const namePart = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  const randomSuffix = Math.floor(Math.random() * 10000); // 4-digit number
  return `${namePart}${randomSuffix}`;
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isUserDataProcess, setIsUserDataProcess] = useState(false);
  const theme = useTheme();
  const [userCreationError, setUserCreationError] = useState("");
  const [generatedUserId, setGeneratedUserId] = useState("");

  const {
    create: createUser,
    isPending: createLoading,
    isSuccess: createSuccess,
    error: createError,
  } = useCreate(axiosWithAuth, URLMapping["register"], "withoutHeaders", {
    onSuccess: (data) => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Failed to create User:", error);
    },
  });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const resFromGoogle = await signInWithPopup(auth, provider);
      if (resFromGoogle?.user) {
        const { user } = resFromGoogle;
        if (user.email) {
          setEmail(user.email);
          setIsUserDataProcess(true);
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setGeneratedUserId(res?.user?.uid || "");
      setIsUserDataProcess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBrandDataSubmit = async (data: any) => {
    try {
      const { fullName, companyName, role, userType } = data;
      const username = generateUsername(email);
      createUser({
        email: email,
        full_name: fullName,
        company_name: companyName,
        role: role,
        password: password,
        username,
        userType,
        uid: generatedUserId,
        phone_number: "9896316134",
      });
    } catch (e) {
      console.error("Error in Registering User", e);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-secondary to-primary text-white flex flex-col justify-center px-16 overflow-hidden">
        <div>
          <div className="text-white text-2xl font-bold mb-2 flex items-center">
            Influency
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome!
            <br />
            Ready to Scale Your Brand?
          </h1>
          <p className="mb-6 text-lg text-white/90">
            Connect with authentic creators who align with your values. Build
            meaningful partnerships that drive engagement and real results.
          </p>
          <blockquote className="italic text-sm text-white/80 mt-8">
            "The best brand partnerships feel natural and authentic. When
            creators genuinely love your product, their audience feels it too."
            <br />
            <span className="block mt-2 font-bold text-white">
              — Marketing Director, Fortune 500
            </span>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      {isUserDataProcess ? (
        <div
          className="flex flex-col justify-items-center w-full items-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {createError && (
            <div
              className="text-center text-sm mt-2 font-bold "
              style={{ color: theme.palette.error.main }}
            >
              Something went wrong
            </div>
          )}

          <OnBoardingFlow
            handleSubmitForm={handleBrandDataSubmit}
            isSaving={createLoading}
          />
        </div>
      ) : (
        <div className="w-1/2 bg-white flex items-center justify-center px-16">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
            <p className="text-sm mb-6">
              Already have an account?{" "}
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log In
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
                // slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginTop: "1em" }}
                // slotProps={{ inputLabel: { shrink: true } }}
              />
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
              onClick={handleSignup}
              sx={{ marginTop: "1em" }}
              color="primary"
            >
              {saving ? (
                <CircularProgress sx={{ color: "#FFFFFF" }} size={"1.2em"} />
              ) : (
                " Sign Up"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="flex gap-4">
  <TextField
    variant="outlined"
    label="First Name"
    fullWidth
    size="small"
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: "#2a263a",
        color: "white",
      },
      "& .MuiInputLabel-root": { color: "gray" },
    }}
  />
  <TextField
    variant="outlined"
    label="Last Name"
    fullWidth
    size="small"
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: "#2a263a",
        color: "white",
      },
      "& .MuiInputLabel-root": { color: "gray" },
    }}
  />
</div>; */
}
