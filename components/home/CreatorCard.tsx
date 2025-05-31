"use client";

import React, { useState } from "react";
import { Chip } from "@mui/material";
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  VideoLibrary as TikTokIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { formatNumber } from "./utils";
import { Creator } from "./types";

interface CreatorCardProps {
  creator: Creator;
  onClick: () => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ aspectRatio: "9/16", height: "400px" }}
    >
      {/* Profile Image */}
      <img
        src={creator.profile_image_url}
        alt={creator.full_name}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isHovered
            ? "bg-gradient-to-b from-black/30 to-black/70"
            : "bg-gradient-to-b from-black/10 to-black/50"
        }`}
      />

      {/* Verification Badge */}
      {creator.is_verified && (
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
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
