import React from "react";
import { Skeleton, Box, Avatar } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

const CreatorCardSkeleton = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200"
      style={{ aspectRatio: "9/16", height: "400px" }}
    >
      {/* Background Image Skeleton with Default Avatar */}
      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            bgcolor: "grey.300",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* Default Avatar in center */}
        <Avatar
          sx={{
            width: 120,
            height: 120,
            bgcolor: "rgba(255,255,255,0.7)",
            color: "gray",
            zIndex: 1,
          }}
        >
          <PersonIcon sx={{ fontSize: 60 }} />
        </Avatar>
      </div>

      {/* Verification Badge Skeleton */}
      <div className="absolute top-3 right-3">
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          sx={{ bgcolor: "grey.400" }}
        />
      </div>

      {/* Category Chip Skeleton */}
      <div className="absolute top-3 left-3">
        <Skeleton
          variant="rounded"
          width={80}
          height={24}
          sx={{ borderRadius: 3, bgcolor: "grey.400" }}
        />
      </div>

      {/* Creator Info at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Name Skeleton */}
        <Skeleton
          variant="text"
          height={24}
          width="70%"
          sx={{ mb: 1, bgcolor: "grey.400" }}
        />

        {/* Username Skeleton */}
        <Skeleton
          variant="text"
          height={16}
          width="50%"
          sx={{ mb: 3, bgcolor: "grey.400" }}
        />

        {/* Social Stats Skeletons - Hidden by default like in real card */}
        <div className="space-y-2 opacity-0">
          {/* Instagram */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              sx={{ bgcolor: "grey.400" }}
            />
            <Skeleton
              variant="text"
              height={14}
              width={40}
              sx={{ bgcolor: "grey.400" }}
            />
          </div>

          {/* YouTube */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              sx={{ bgcolor: "grey.400" }}
            />
            <Skeleton
              variant="text"
              height={14}
              width={40}
              sx={{ bgcolor: "grey.400" }}
            />
          </div>

          {/* TikTok */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              sx={{ bgcolor: "grey.400" }}
            />
            <Skeleton
              variant="text"
              height={14}
              width={40}
              sx={{ bgcolor: "grey.400" }}
            />
          </div>

          {/* Engagement Rate */}
          <div className="flex items-center gap-2 mt-2">
            <Skeleton
              variant="circular"
              width={8}
              height={8}
              sx={{ bgcolor: "grey.400" }}
            />
            <Skeleton
              variant="text"
              height={14}
              width={80}
              sx={{ bgcolor: "grey.400" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCardSkeleton;
