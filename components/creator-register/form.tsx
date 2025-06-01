"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CircularProgress,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CATEGORIES,
  CONTENT_TYPES,
  LANGUAGES,
  URLMapping,
} from "@/lib/constants";
import { axiosWithAuth } from "@/lib/axios";
import { useCreate } from "@/hooks/useCreate";

interface CreatorFormData {
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  bio: string;
  location: string;
  category: string;
  instagram_handle: string;
  youtube_handle: string;
  tiktok_handle: string;
  twitter_handle: string;
  base_rate: number | string;
  engagement_rate: number | string;
  languages: string[];
  content_types: string[];
}

// Custom styling for reduced padding
const inputSx = {
  "& .MuiOutlinedInput-root": {
    "& input": {
      padding: "8px 14px",
    },
    "& textarea": {
      padding: "8px 14px",
    },
  },
  // Ensure consistent height for all inputs
  "& .MuiInputBase-root": {
    minHeight: "40px",
  },
};

export default function CreatorRegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCreatorCreated, setIsCreatorCreated] = useState(false);

  // Creator form state
  const [creatorForm, setCreatorForm] = useState<CreatorFormData>({
    email: "",
    username: "",
    full_name: "",
    phone_number: "",
    bio: "",
    location: "",
    category: "",
    instagram_handle: "",
    youtube_handle: "",
    tiktok_handle: "",
    twitter_handle: "",
    base_rate: 0,
    engagement_rate: 0,
    languages: [],
    content_types: [],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const {
    create: createUser,
    isPending: createLoading,
    isSuccess: createSuccess,
    error: createError,
  } = useCreate(
    axiosWithAuth,
    URLMapping["registerCreator"],
    "withoutHeaders",
    {
      onSuccess: (data) => {
        setIsCreatorCreated(true);
      },
      onError: (error) => {
        console.error("Failed to create User:", error);
      },
    }
  );

  const validateCreatorForm = () => {
    const errors: Record<string, string> = {};

    // Required fields
    if (!creatorForm.email) errors.email = "Email is required";
    if (!creatorForm.username) errors.username = "Username is required";
    if (!creatorForm.full_name) errors.full_name = "Full name is required";
    if (!creatorForm.phone_number)
      errors.phone_number = "Phone number is required";
    if (!creatorForm.bio) errors.bio = "Bio is required";
    if (!creatorForm.location) errors.location = "Location is required";
    if (!creatorForm.category) errors.category = "Category is required";
    if (!creatorForm.base_rate || Number(creatorForm.base_rate) <= 0)
      errors.base_rate = "Base rate is required and must be greater than 0";
    if (
      !creatorForm.engagement_rate ||
      Number(creatorForm.engagement_rate) <= 0
    )
      errors.engagement_rate =
        "Engagement rate is required and must be greater than 0";
    if (creatorForm.languages.length === 0)
      errors.languages = "At least one language is required";
    if (creatorForm.content_types.length === 0)
      errors.content_types = "At least one content type is required";

    // At least one social handle required
    const hasHandle =
      creatorForm.instagram_handle ||
      creatorForm.youtube_handle ||
      creatorForm.tiktok_handle ||
      creatorForm.twitter_handle;
    if (!hasHandle) {
      errors.handles = "At least one social media handle is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (creatorForm.email && !emailRegex.test(creatorForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (basic check for minimum length)
    if (creatorForm.phone_number && creatorForm.phone_number.length < 10) {
      errors.phone_number = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCreatorForm()) return;

    try {
      setIsLoading(true);
      // Here you would typically create the user account and save the creator data
      console.log("Creator registration data:", creatorForm);
      // For now, just redirect to dashboard
      createUser(creatorForm);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatorFormChange = (
    field: keyof CreatorFormData,
    value: any
  ) => {
    setCreatorForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col h-full">
      {/* Custom styles for phone input to match Material-UI */}
      <style jsx global>{`
        .react-tel-input {
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        }

        .react-tel-input .form-control {
          width: 100%;
          height: 40px;
          padding: 8px 14px 8px 58px;
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 4px;
          font-size: 16px;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          background-color: transparent;
          transition: border-color 0.15s ease-in-out;
        }

        .react-tel-input .form-control:focus {
          border-color: #6366f1;
          border-width: 2px;
          outline: none;
        }

        .react-tel-input .flag-dropdown {
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 4px 0 0 4px;
          background-color: transparent;
        }

        .react-tel-input .flag-dropdown:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }

        .react-tel-input .flag-dropdown.open {
          background-color: rgba(0, 0, 0, 0.04);
        }

        .react-tel-input .selected-flag {
          padding: 0 8px;
          height: 38px;
        }

        .react-tel-input .country-list {
          border-radius: 4px;
          box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
            0px 8px 10px 1px rgba(0, 0, 0, 0.14),
            0px 3px 14px 2px rgba(0, 0, 0, 0.12);
        }

        .phone-input-error .react-tel-input .form-control {
          border-color: #d32f2f;
        }

        .phone-input-error .react-tel-input .flag-dropdown {
          border-color: #d32f2f;
        }
      `}</style>

      {isCreatorCreated || createSuccess ? (
        // Success Message
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                Welcome to Influency!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Your creator profile has been created successfully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  You'll receive leads as soon as a brand connects with you.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Form Content
        <>
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">Join as a Creator</h2>
            <p className="text-sm mb-6 text-gray-600">
              Create your creator profile and start connecting with brands
            </p>

            <form onSubmit={handleCreatorSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Email"
                    type="email"
                    value={creatorForm.email}
                    onChange={(e) =>
                      handleCreatorFormChange("email", e.target.value)
                    }
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                  <TextField
                    label="Username"
                    value={creatorForm.username}
                    onChange={(e) =>
                      handleCreatorFormChange("username", e.target.value)
                    }
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                </div>

                <div className="mt-6">
                  <TextField
                    label="Full Name"
                    value={creatorForm.full_name}
                    onChange={(e) =>
                      handleCreatorFormChange("full_name", e.target.value)
                    }
                    error={!!formErrors.full_name}
                    helperText={formErrors.full_name}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                </div>

                {/* Phone Number Field */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div
                    className={
                      formErrors.phone_number ? "phone-input-error" : ""
                    }
                  >
                    <PhoneInput
                      country={"in"}
                      value={creatorForm.phone_number}
                      onChange={(phone) =>
                        handleCreatorFormChange("phone_number", phone)
                      }
                      inputProps={{
                        name: "phone_number",
                        required: true,
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      inputStyle={{
                        width: "100%",
                      }}
                    />
                  </div>
                  {formErrors.phone_number && (
                    <p className="text-xs text-red-600 mt-1 ml-3">
                      {formErrors.phone_number}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <TextField
                    label="Bio"
                    multiline
                    rows={3}
                    value={creatorForm.bio}
                    onChange={(e) =>
                      handleCreatorFormChange("bio", e.target.value)
                    }
                    error={!!formErrors.bio}
                    helperText={formErrors.bio}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& textarea": {
                          padding: "8px 14px",
                        },
                      },
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <TextField
                    label="Location"
                    value={creatorForm.location}
                    onChange={(e) =>
                      handleCreatorFormChange("location", e.target.value)
                    }
                    error={!!formErrors.location}
                    helperText={formErrors.location}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                  <Autocomplete
                    options={CATEGORIES}
                    value={creatorForm.category || ""}
                    onChange={(event, newValue) =>
                      handleCreatorFormChange("category", newValue)
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        padding: "2px 40px 2px 8px !important",
                      },
                      "& .MuiAutocomplete-inputRoot": {
                        paddingRight: "40px !important",
                      },
                      "& .MuiAutocomplete-endAdornment": {
                        right: "8px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        error={!!formErrors.category}
                        helperText={formErrors.category}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                    fullWidth
                  />
                </div>
              </div>

              {/* Social Media Handles */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Social Media Handles</h3>
                  <p className="text-sm text-gray-600">
                    At least one handle is required
                  </p>
                  {formErrors.handles && (
                    <p className="text-sm text-red-600">{formErrors.handles}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Instagram Handle"
                    value={creatorForm.instagram_handle}
                    onChange={(e) =>
                      handleCreatorFormChange(
                        "instagram_handle",
                        e.target.value
                      )
                    }
                    placeholder="@username"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                  <TextField
                    label="YouTube Handle"
                    value={creatorForm.youtube_handle}
                    onChange={(e) =>
                      handleCreatorFormChange("youtube_handle", e.target.value)
                    }
                    placeholder="@username"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                  <TextField
                    label="TikTok Handle"
                    value={creatorForm.tiktok_handle}
                    onChange={(e) =>
                      handleCreatorFormChange("tiktok_handle", e.target.value)
                    }
                    placeholder="@username"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                  <TextField
                    label="Twitter Handle"
                    value={creatorForm.twitter_handle}
                    onChange={(e) =>
                      handleCreatorFormChange("twitter_handle", e.target.value)
                    }
                    placeholder="@username"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                </div>
              </div>

              {/* Rates */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Base Rate (₹)"
                    type="number"
                    value={
                      creatorForm.base_rate === 0 ? "" : creatorForm.base_rate
                    }
                    onChange={(e) =>
                      handleCreatorFormChange(
                        "base_rate",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    error={!!formErrors.base_rate}
                    helperText={formErrors.base_rate}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    sx={inputSx}
                  />
                  <TextField
                    label="Engagement Rate (%)"
                    type="number"
                    value={
                      creatorForm.engagement_rate === 0
                        ? ""
                        : creatorForm.engagement_rate
                    }
                    onChange={(e) =>
                      handleCreatorFormChange(
                        "engagement_rate",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    error={!!formErrors.engagement_rate}
                    helperText={formErrors.engagement_rate}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputSx}
                  />
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <Autocomplete
                  multiple
                  options={LANGUAGES}
                  value={creatorForm.languages}
                  onChange={(event, newValue) =>
                    handleCreatorFormChange("languages", newValue)
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "2px 40px 2px 8px !important",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      paddingRight: "40px !important",
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Languages"
                      error={!!formErrors.languages}
                      helperText={formErrors.languages}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  fullWidth
                />
              </div>

              {/* Content Types */}
              <div className="space-y-4">
                <Autocomplete
                  multiple
                  options={CONTENT_TYPES}
                  value={creatorForm.content_types}
                  onChange={(event, newValue) =>
                    handleCreatorFormChange("content_types", newValue)
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "2px 40px 2px 8px !important",
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      paddingRight: "40px !important",
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Content Types"
                      error={!!formErrors.content_types}
                      helperText={formErrors.content_types}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  fullWidth
                />
              </div>
            </form>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white pt-6 pb-4 border-t border-gray-100 mt-6 bg-white z-50">
            {(error || createError) && (
              <div className="text-center text-sm text-red-600 mb-4">
                {error || createError?.message}
              </div>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mb-4 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 normal-case"
              sx={{ height: "48px" }}
              disabled={isLoading || createLoading}
              onClick={handleCreatorSubmit}
            >
              {isLoading || createLoading ? (
                <CircularProgress sx={{ color: "#FFFFFF" }} size={"1.2em"} />
              ) : (
                "Create Creator Profile"
              )}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <span className="block">
                  You'll receive leads as soon as a brand connects with you.
                </span>
                Or,{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => router.push("/login?type=brand")}
                >
                  Join as a brand
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
