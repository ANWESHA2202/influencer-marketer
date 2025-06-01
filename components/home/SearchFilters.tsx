"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  InputAdornment,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Collapse,
  Slider,
  Button,
  IconButton,
} from "@mui/material";
import {
  Category as CategoryIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  TrendingUp as EngagementIcon,
  Search as SearchIcon,
  Psychology as AIIcon,
  Cake as AgeIcon,
  Person as GenderIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { categories, locations, genders } from "./utils";

interface SearchFiltersProps {
  onFiltersChange?: (filters: any, searchQuery: string) => void;
}

// Custom styling for compact input fields
const compactInputSx = {
  "& .MuiInputBase-root": {
    paddingTop: "4px",
    paddingBottom: "4px",
    minHeight: "40px",
    fontSize: "14px",
  },
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    transform: "translate(14px, 12px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
  },
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  // Default filter state
  const defaultFilters = {
    category: null,
    min_followers: "",
    location: null,
    min_engagement_rate: "",
    age_range: [18, 65],
    gender: null,
  };

  // Local state for immediate UI updates
  const [localFilters, setLocalFilters] = useState(defaultFilters);

  // State for committed filters (sent to parent)
  const [committedFilters, setCommittedFilters] = useState(defaultFilters);

  // AI Prompt state
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [aiSearchPrompt, setAISearchPrompt] = useState("");

  const handleTextFieldChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextFieldBlur = (field: string, value: string) => {
    const newCommittedFilters = { ...committedFilters, [field]: value };
    setCommittedFilters(newCommittedFilters);
    onFiltersChange?.(newCommittedFilters, aiSearchPrompt);
  };

  const handleDropdownChange = (field: string, value: any) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    const newCommittedFilters = { ...committedFilters, [field]: value };
    setCommittedFilters(newCommittedFilters);
    onFiltersChange?.(newCommittedFilters, aiSearchPrompt);
  };

  const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
    const ageRange = newValue as number[];
    setLocalFilters((prev) => ({ ...prev, age_range: ageRange }));
  };

  const handleAgeRangeCommitted = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const ageRange = newValue as number[];
    const newCommittedFilters = { ...committedFilters, age_range: ageRange };
    setCommittedFilters(newCommittedFilters);
    onFiltersChange?.(newCommittedFilters, aiSearchPrompt);
  };

  const handleAIToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setIsAIEnabled(enabled);
    if (!enabled) {
      setAISearchPrompt("");
      onFiltersChange?.("", "");
    } else {
      onFiltersChange?.(committedFilters, aiSearchPrompt);
    }
  };

  const handleAISearchChange = (value: string) => {
    setAISearchPrompt(value);
  };

  const handleAISearchBlur = () => {
    onFiltersChange?.(committedFilters, aiSearchPrompt);
  };

  const handleResetFilters = () => {
    setLocalFilters(defaultFilters);
    setCommittedFilters(defaultFilters);
    setAISearchPrompt("");
    onFiltersChange?.(defaultFilters, "");
  };

  return (
    <Paper elevation={2} sx={{ p: 0, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Filter Creators</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleResetFilters}
            sx={{
              textTransform: "none",
              borderColor: "action.disabled",
              color: "text.secondary",
              "&:hover": {
                borderColor: "action.hover",
                backgroundColor: "action.hover",
              },
            }}
          >
            Reset All
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={isAIEnabled}
                onChange={handleAIToggle}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AIIcon color={isAIEnabled ? "primary" : "action"} />
                <Typography variant="body2">AI Prompt</Typography>
              </Box>
            }
          />
        </Box>
      </Box>

      <Collapse in={isAIEnabled}>
        <TextField
          fullWidth
          label=" AI-Powered Creator Search"
          placeholder="Describe the type of creator you're looking for..."
          value={aiSearchPrompt}
          onChange={(e) => handleAISearchChange(e.target.value)}
          onBlur={handleAISearchBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAISearchBlur();
            }
          }}
          multiline
          rows={3}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              border: "1px solid rgba(25, 118, 210, 0.1)",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
                borderColor: "transparent",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                borderColor: "transparent",
                boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: 600,
              fontSize: "16px",
              color: "primary.main",
              "&.Mui-focused": {
                color: "primary.main",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "16px",
              lineHeight: 1.5,
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "15px",
              fontStyle: "italic",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ alignSelf: "flex-start", mt: 1 }}
              >
                <SearchIcon color="primary" sx={{ fontSize: 24 }} />
              </InputAdornment>
            ),
          }}
        />
      </Collapse>

      {/* Divider between AI and regular filters */}
      {isAIEnabled && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            opacity: 0.6,
            marginTop: "1em",
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "1px",
              backgroundColor: "divider",
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            CAN USE TRADITIONAL FILTERS TOO
          </Typography>
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "divider" }} />
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Category Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={categories}
            value={localFilters.category}
            onChange={(_, newValue) =>
              handleDropdownChange("category", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by creator category"
                placeholder="Category"
                sx={compactInputSx}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Minimum Followers */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="Minimum follower count"
            placeholder="Minimum followers"
            type="number"
            value={localFilters.min_followers}
            onChange={(e) =>
              handleTextFieldChange("min_followers", e.target.value)
            }
            onBlur={(e) =>
              handleTextFieldBlur("min_followers", localFilters.min_followers)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTextFieldBlur(
                  "min_followers",
                  localFilters.min_followers
                );
              }
            }}
            sx={compactInputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Location Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={locations}
            value={localFilters.location}
            onChange={(_, newValue) =>
              handleDropdownChange("location", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by location"
                placeholder="Location"
                sx={compactInputSx}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Minimum Engagement Rate */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="Minimum engagement rate"
            placeholder="Minimum engagement rate"
            type="number"
            value={localFilters.min_engagement_rate}
            onChange={(e) =>
              handleTextFieldChange("min_engagement_rate", e.target.value)
            }
            onBlur={(e) =>
              handleTextFieldBlur(
                "min_engagement_rate",
                localFilters.min_engagement_rate
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTextFieldBlur(
                  "min_engagement_rate",
                  localFilters.min_engagement_rate
                );
              }
            }}
            sx={compactInputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EngagementIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Grid>

        {/* Age Range */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ px: 2, pt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AgeIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                Age Range: {localFilters.age_range[0]} -{" "}
                {localFilters.age_range[1]}
              </Typography>
            </Box>
            <Slider
              value={localFilters.age_range}
              onChange={handleAgeRangeChange}
              onChangeCommitted={handleAgeRangeCommitted}
              valueLabelDisplay="auto"
              min={13}
              max={80}
              sx={{
                color: isAIEnabled ? "action.disabled" : "primary.main",
              }}
            />
          </Box>
        </Grid>

        {/* Gender Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={genders}
            value={localFilters.gender}
            onChange={(_, newValue) => handleDropdownChange("gender", newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by gender"
                placeholder="Gender"
                sx={compactInputSx}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <GenderIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchFilters;
