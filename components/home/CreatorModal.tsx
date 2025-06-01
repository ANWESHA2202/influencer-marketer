"use client";

import React, { useEffect } from "react";
import { Modal, IconButton, Chip, Avatar, Button } from "@mui/material";
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  VideoLibrary as TikTokIcon,
  Verified as VerifiedIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { formatNumber } from "./utils";
import { Creator } from "./types";
import useFetchData from "@/hooks/useFetchData";
import { axiosWithAuth } from "@/lib/axios";
import { URLMapping } from "@/lib/constants";

interface CreatorModalProps {
  creator: Creator | null;
  open: boolean;
  onClose: () => void;
}

const CreatorModal: React.FC<CreatorModalProps> = ({
  creator,
  open,
  onClose,
}) => {
  if (!creator) return null;

  const {
    data: campaignData,
    isLoading: campaignDataLoading,
    refetch: refetchCampaignData,
    error: campaignDataError,
  } = useFetchData(axiosWithAuth, URLMapping["campaigns"], "withHeaders", {
    enabled: false,
    select: (data) => {
      console.log(data, "data");
      return data || [];
    },
    onError: (error) => {
      console.error("Failed to fetch campaigns:", error);
    },
  });

  useEffect(() => {
    refetchCampaignData();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/10 z-10"
        >
          <CloseIcon />
        </IconButton>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Media Kit */}
          <div className="flex-1">
            <img
              src={creator.media_kit_url}
              alt="Latest Post"
              className="w-full h-80 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
          </div>

          {/* Right Side - Creator Details */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                src={creator.profile_image_url}
                alt={creator.full_name}
                className="w-15 h-15"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{creator.full_name}</h2>
                  {creator.is_verified && (
                    <VerifiedIcon className="text-blue-500 text-xl" />
                  )}
                </div>
                <p className="text-gray-600">@{creator.username}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-4">{creator.bio}</p>

            {/* Location & Category */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <LocationIcon className="text-gray-500 text-base" />
                <span className="text-gray-600 text-sm">
                  {creator.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CategoryIcon className="text-gray-500 text-base" />
                <span className="text-gray-600 text-sm">
                  {creator.category}
                </span>
              </div>
            </div>

            <hr className="my-4" />

            {/* Social Media Stats */}
            <h3 className="text-lg font-semibold mb-3">Social Media Reach</h3>

            <div className="space-y-3 mb-4">
              {/* Instagram */}
              {creator.instagram_followers && creator.instagram_handle && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <InstagramIcon className="text-pink-500" />
                    <span className="text-sm">{creator.instagram_handle}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatNumber(creator.instagram_followers)}
                  </span>
                </div>
              )}

              {/* YouTube */}
              {creator.youtube_subscribers && creator.youtube_handle && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <YouTubeIcon className="text-red-500" />
                    <span className="text-sm">{creator.youtube_handle}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatNumber(creator.youtube_subscribers)}
                  </span>
                </div>
              )}

              {/* TikTok */}
              {creator.tiktok_followers && creator.tiktok_handle && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TikTokIcon />
                    <span className="text-sm">{creator.tiktok_handle}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatNumber(creator.tiktok_followers)}
                  </span>
                </div>
              )}

              {/* Twitter */}
              {creator.twitter_followers && creator.twitter_handle && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TwitterIcon className="text-blue-400" />
                    <span className="text-sm">{creator.twitter_handle}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatNumber(creator.twitter_followers)}
                  </span>
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <div className="text-xl font-bold text-indigo-600">
                  {creator.engagement_rate}%
                </div>
                <div className="text-xs text-gray-600">Engagement Rate</div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-lg">
                <div className="text-xl font-bold text-pink-600">
                  ${formatNumber(creator.base_rate)}
                </div>
                <div className="text-xs text-gray-600">Base Rate</div>
              </div>
            </div>

            {/* Languages & Content Types */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Languages</h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {creator.languages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    size="small"
                    variant="outlined"
                    icon={<LanguageIcon />}
                  />
                ))}
              </div>

              <h4 className="text-sm font-semibold mb-2">Content Types</h4>
              <div className="flex flex-wrap gap-1">
                {creator.content_types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    size="small"
                    className="bg-indigo-600 text-white"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}

            <Button
              variant="contained"
              fullWidth
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Creator
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatorModal;
