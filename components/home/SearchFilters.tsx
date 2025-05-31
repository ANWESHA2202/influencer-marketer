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
} from "@mui/icons-material";
import { categories, locations, genders } from "./utils";

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
  onAISearchChange?: (searchPrompt: string, isAIEnabled: boolean) => void;
}

// Custom styling for compact input fields
const compactInputSx = {
  "& .MuiInputBase-root": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  "& .MuiInputBase-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
};

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  onAISearchChange,
}) => {
  // Local state for immediate UI updates
  const [localFilters, setLocalFilters] = useState({
    category: null,
    min_followers: "",
    location: null,
    min_engagement_rate: "",
    age_range: [18, 65],
    gender: null,
  });

  // State for committed filters (sent to parent)
  const [committedFilters, setCommittedFilters] = useState({
    category: null,
    min_followers: "",
    location: null,
    min_engagement_rate: "",
    age_range: [18, 65],
    gender: null,
  });

  // AI search state
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [aiSearchPrompt, setAISearchPrompt] = useState("");

  const handleTextFieldChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextFieldBlur = (field: string, value: string) => {
    const newCommittedFilters = { ...committedFilters, [field]: value };
    setCommittedFilters(newCommittedFilters);
    onFiltersChange?.(newCommittedFilters);
  };

  const handleDropdownChange = (field: string, value: any) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    const newCommittedFilters = { ...committedFilters, [field]: value };
    setCommittedFilters(newCommittedFilters);
    onFiltersChange?.(newCommittedFilters);
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
    onFiltersChange?.(newCommittedFilters);
  };

  const handleAIToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setIsAIEnabled(enabled);
    if (!enabled) {
      setAISearchPrompt("");
      onAISearchChange?.("", false);
    } else {
      onAISearchChange?.(aiSearchPrompt, true);
    }
  };

  const handleAISearchChange = (value: string) => {
    setAISearchPrompt(value);
  };

  const handleAISearchBlur = () => {
    onAISearchChange?.(aiSearchPrompt, isAIEnabled);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Filter Creators</Typography>
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
              <Typography variant="body2">AI Search</Typography>
            </Box>
          }
        />
      </Box>

      <Collapse in={isAIEnabled}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="AI Search"
            placeholder="Describe the type of creator you're looking for..."
            value={aiSearchPrompt}
            onChange={(e) => handleAISearchChange(e.target.value)}
            onBlur={handleAISearchBlur}
            sx={{
              ...compactInputSx,
              "& .MuiInputBase-root": {
                ...compactInputSx["& .MuiInputBase-root"],
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Collapse>

      <Grid container spacing={3}>
        {/* Category Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={categories}
            value={localFilters.category}
            onChange={(_, newValue) =>
              handleDropdownChange("category", newValue)
            }
            disabled={isAIEnabled}
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
            onBlur={(e) => handleTextFieldBlur("min_followers", e.target.value)}
            disabled={isAIEnabled}
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
            disabled={isAIEnabled}
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
              handleTextFieldBlur("min_engagement_rate", e.target.value)
            }
            disabled={isAIEnabled}
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
              disabled={isAIEnabled}
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
            disabled={isAIEnabled}
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
