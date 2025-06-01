"use client";

import React, { useState } from "react";
import { Chip, Avatar } from "@mui/material";
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  VideoLibrary as TikTokIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { formatNumber } from "./utils";
import { Creator } from "./types";

interface CreatorCardProps {
  creator: Creator;
  onClick: () => void;
}

// Function to get match score icon and color
const getMatchScoreDisplay = (score: number | null | undefined) => {
  if (!score) return null;

  let icon, color, label;

  if (score >= 95) {
    icon = <StarIcon className="text-yellow-400" />;
    color = "bg-yellow-500/90";
    label = "Perfect";
  } else if (score >= 80) {
    icon = <StarIcon className="text-green-400" />;
    color = "bg-green-500/90";
    label = "Best";
  } else if (score >= 60) {
    icon = <TrendingUpIcon className="text-blue-400" />;
    color = "bg-blue-500/90";
    label = "Good";
  } else if (score >= 30) {
    icon = <StarHalfIcon className="text-orange-400" />;
    color = "bg-orange-500/90";
    label = "Medium";
  } else {
    icon = <TrendingDownIcon className="text-red-400" />;
    color = "bg-red-500/90";
    label = "Low";
  }

  return { icon, color, label, score };
};

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const matchDisplay = getMatchScoreDisplay(creator.match_score);

  const hasValidImage = creator.profile_image_url && !imageError;

  return (
    <div
      className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ aspectRatio: "9/16", height: "400px" }}
    >
      {/* Profile Image or Default Avatar */}
      {hasValidImage ? (
        <img
          src={creator.profile_image_url}
          alt={creator.full_name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "rgba(255,255,255,0.9)",
              color: "gray",
            }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isHovered
            ? "bg-gradient-to-b from-black/30 to-black/70"
            : "bg-gradient-to-b from-black/10 to-black/50"
        }`}
      />

      {/* Match Score Badge */}
      {matchDisplay && (
        <div
          className={`absolute top-3 right-3 ${matchDisplay.color} rounded-full px-2 py-1 flex items-center gap-1`}
        >
          {matchDisplay.icon}
          <span className="text-white text-xs font-semibold">
            {matchDisplay.score}%
          </span>
        </div>
      )}

      {/* Verification Badge */}
      {creator.is_verified && (
        <div
          className={`absolute ${
            matchDisplay ? "top-12" : "top-3"
          } right-3 bg-white/90 rounded-full p-1`}
        >
          <VerifiedIcon className="text-blue-500 text-xl" />
        </div>
      )}

      {/* Category Chip */}
      <div className="absolute top-3 left-3">
        <Chip
          label={creator.category}
          size="small"
          className="bg-white/90 font-semibold text-xs"
        />
      </div>

      {/* Creator Info - Always Visible at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold mb-1">{creator.full_name}</h3>
        <p className="text-gray-200 text-sm mb-3">@{creator.username}</p>

        {/* Social Stats - Show on Hover with Overlay Effect */}
        <div
          className={`transition-all duration-300 space-y-2 ${
            isHovered
              ? "opacity-100 translate-y-0 h-auto"
              : "opacity-0 translate-y-5 h-0"
          }`}
        >
          {/* Instagram */}
          {creator.instagram_followers && (
            <div className="flex items-center gap-2">
              <InstagramIcon className="text-pink-500 text-base" />
              <span className="text-white text-sm">
                {formatNumber(creator.instagram_followers)}
              </span>
            </div>
          )}

          {/* YouTube */}
          {creator.youtube_subscribers && (
            <div className="flex items-center gap-2">
              <YouTubeIcon className="text-red-500 text-base" />
              <span className="text-white text-sm">
                {formatNumber(creator.youtube_subscribers)}
              </span>
            </div>
          )}

          {/* TikTok */}
          {creator.tiktok_followers && (
            <div className="flex items-center gap-2">
              <TikTokIcon className="text-black text-base" />
              <span className="text-white text-sm">
                {formatNumber(creator.tiktok_followers)}
              </span>
            </div>
          )}

          {/* Twitter */}
          {creator.twitter_followers && (
            <div className="flex items-center gap-2">
              <TwitterIcon className="text-blue-400 text-base" />
              <span className="text-white text-sm">
                {formatNumber(creator.twitter_followers)}
              </span>
            </div>
          )}

          {/* Engagement Rate */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white text-sm font-semibold">
              {creator.engagement_rate}% engagement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
