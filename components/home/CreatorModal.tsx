"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  IconButton,
  Chip,
  Avatar,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
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
  Person as PersonIcon,
  Campaign as CampaignIcon,
} from "@mui/icons-material";
import { formatNumber } from "./utils";
import { Creator } from "./types";
import useFetchData from "@/hooks/useFetchData";
import { axiosWithAuth } from "@/lib/axios";
import { URLMapping } from "@/lib/constants";
import { useCreate } from "@/hooks/useCreate";

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
  const [imageError, setImageError] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [
    isInviteCreatorToCampaignSuccess,
    setIsInviteCreatorToCampaignSuccess,
  ] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const hasValidImage = creator?.profile_image_url && !imageError;

  // Reset image error when creator changes
  useEffect(() => {
    setImageError(false);
  }, [creator?.id]);

  const {
    data: campaignData,
    isLoading: campaignDataLoading,
    refetch: refetchCampaignData,
    error: campaignDataError,
  } = useFetchData(axiosWithAuth, URLMapping["campaigns"], "withHeaders", {
    enabled: false,
    select: (data) => {
      return data?.data || [];
    },
    onError: (error) => {
      console.error("Failed to fetch campaigns:", error);
    },
  });

  const {
    create: inviteCreatorToCampaign,
    isPending: inviteCreatorToCampaignLoading,
    isSuccess: inviteCreatorToCampaignSuccess,
    error: inviteCreatorToCampaignError,
  } = useCreate(
    axiosWithAuth,
    `${URLMapping["campaigns"]}${campaignId}/invite`,
    "withHeaders",
    {
      onSuccess: (data) => {
        setIsInviteCreatorToCampaignSuccess(true);
        handlePopoverClose();
      },
      onError: (error) => {
        console.error("Failed to create User:", error);
      },
    }
  );

  useEffect(() => {
    refetchCampaignData();
  }, []);

  if (!creator) return null;

  const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCampaignSelect = (campaign: any) => {
    setCampaignId(campaign?.id);
    inviteCreatorToCampaign({
      creator_id: creator?.id,
      campaign_id: campaign?.id,
      offered_rate: campaign?.budget,
      deliverables_total: 2,
    });
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "campaign-popover" : undefined;

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center p-4"
      sx={{
        "&:focus": {
          outline: "none",
        },
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] overflow-hidden relative focus:outline-none"
        style={{ outline: "none" }}
      >
        {/* Modal Content */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Media Kit - Fixed */}
          <div className="flex-1 h-80 md:h-full">
            {hasValidImage ? (
              <img
                src={creator.profile_image_url}
                alt="Latest Post"
                className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
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
          </div>

          {/* Right Side - Creator Details - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  src={hasValidImage ? creator.profile_image_url : undefined}
                  alt={creator.full_name}
                  className="w-15 h-15"
                >
                  {!hasValidImage && <PersonIcon />}
                </Avatar>
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
                      <span className="text-sm">
                        {creator.instagram_handle}
                      </span>
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
                onClick={handleContactClick}
                variant="contained"
                disabled={
                  isInviteCreatorToCampaignSuccess ||
                  inviteCreatorToCampaignLoading
                }
                fullWidth
                className={`bg-indigo-600 hover:bg-indigo-700 ${
                  isInviteCreatorToCampaignSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }`}
                startIcon={<CampaignIcon />}
              >
                {isInviteCreatorToCampaignSuccess
                  ? "Invite Sent"
                  : inviteCreatorToCampaignLoading
                  ? "Inviting..."
                  : "Contact Creator"}
              </Button>

              {/* Campaign Selection Popover */}
              <Popover
                id={popoverId}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                PaperProps={{
                  sx: {
                    maxWidth: 400,
                    maxHeight: 300,
                    mt: -1,
                  },
                }}
              >
                <div className="p-4">
                  <Typography variant="h6" className="mb-3 font-semibold">
                    Select Campaign
                  </Typography>

                  {campaignDataLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <CircularProgress size={24} />
                      <Typography variant="body2" className="ml-2">
                        Loading campaigns...
                      </Typography>
                    </div>
                  ) : campaignDataError ? (
                    <Typography
                      variant="body2"
                      color="error"
                      className="py-4 text-center"
                    >
                      Failed to load campaigns
                    </Typography>
                  ) : campaignData && campaignData.length > 0 ? (
                    <List className="max-h-48 overflow-y-auto">
                      {campaignData.map((campaign: any, index: number) => (
                        <ListItem key={campaign.id || index} disablePadding>
                          <ListItemButton
                            onClick={() => handleCampaignSelect(campaign)}
                            className="hover:bg-gray-50 rounded-lg mb-1"
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="subtitle2"
                                  className="font-medium"
                                >
                                  {campaign.title ||
                                    campaign.name ||
                                    `Campaign ${index + 1}`}
                                </Typography>
                              }
                              secondary={
                                <span>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    component="span"
                                    className="block"
                                  >
                                    {campaign.description ||
                                      "No description available"}
                                  </Typography>
                                  {campaign.budget && (
                                    <Typography
                                      variant="caption"
                                      component="span"
                                      className="block text-green-600"
                                    >
                                      Budget: ${formatNumber(campaign.budget)}
                                    </Typography>
                                  )}
                                  {campaign.status && (
                                    <span className="inline-block mt-1">
                                      <Chip
                                        label={campaign.status}
                                        size="small"
                                        color={
                                          campaign.status === "active"
                                            ? "success"
                                            : "default"
                                        }
                                      />
                                    </span>
                                  )}
                                </span>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="py-4 text-center"
                    >
                      No campaigns available
                    </Typography>
                  )}
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatorModal;
