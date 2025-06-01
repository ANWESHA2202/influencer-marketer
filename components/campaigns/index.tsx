"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CampaignForm from "./CampaignForm";
import CampaignTable from "./CampaignTable";
import EmptyView from "../common/EmptyView";
import { useRouter } from "next/navigation";
import { URLMapping } from "@/lib/constants";
import { axiosWithAuth } from "@/lib/axios";
import useCreate from "@/hooks/useCreate";

interface CampaignFormData {
  title: string;
  description: string;
  brand_name: string;
  campaign_type: string;
  budget: number | "";
  start_date: string;
  end_date: string;
  target_audience: {
    value: string;
  };
  content_requirements: {
    value: string;
  };
  deliverables: {
    value: string;
  };
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  campaign_type: string;
  budget: number;
  start_date: string;
  end_date: string;
  target_audience: string;
  content_requirements: string;
  deliverables: string;
  status: "draft" | "active" | "paused" | "completed" | "cancelled";
  created_at: string;
  influencers_reached: number;
}

const CampaignsComponent = ({
  setSelectedCampaign,
}: {
  setSelectedCampaign: (campaign: any) => void;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    // Sample data based on your provided structure
    {
      id: "1",
      title: "Summer Fashion Collection",
      description:
        "Promote our new summer fashion line with lifestyle influencers",
      campaign_type: "Fashion",
      budget: 15000,
      start_date: "2025-06-01T00:00:00.000Z",
      end_date: "2025-07-31T23:59:59.000Z",
      target_audience: "18-35",
      content_requirements: "3 posts, 5 stories, 2 reels",
      deliverables: "100000 reach, 5000 engagement",
      status: "active",
      created_at: "2025-05-15T10:30:00.000Z",
      influencers_reached: 12,
    },
    {
      id: "2",
      title: "Tech Product Launch",
      description: "Launch campaign for our new smartphone with tech reviewers",
      campaign_type: "Technology",
      budget: 25000,
      start_date: "2025-06-15T00:00:00.000Z",
      end_date: "2025-08-15T23:59:59.000Z",
      target_audience: "25-45",
      content_requirements: "2 reviews, 1 unboxing, 1 tutorial",
      deliverables: "200000 reach, 10000 engagement",
      status: "draft",
      created_at: "2025-05-20T14:15:00.000Z",
      influencers_reached: 7,
    },
    {
      id: "3",
      title: "Fitness Challenge",
      description:
        "30-day fitness challenge with health and wellness influencers",
      campaign_type: "Health & Wellness",
      budget: 8000,
      start_date: "2025-07-01T00:00:00.000Z",
      end_date: "2025-07-31T23:59:59.000Z",
      target_audience: "20-40",
      content_requirements: "30 daily posts, 10 workout videos",
      deliverables: "75000 reach, 7500 engagement",
      status: "paused",
      created_at: "2025-05-10T09:45:00.000Z",
      influencers_reached: 15,
    },
    {
      id: "4",
      title: "Holiday Gift Guide",
      description: "Holiday season gift recommendations campaign",
      campaign_type: "Lifestyle",
      budget: 12000,
      start_date: "2024-11-01T00:00:00.000Z",
      end_date: "2024-12-31T23:59:59.000Z",
      target_audience: "25-50",
      content_requirements: "5 gift guides, 10 reviews",
      deliverables: "150000 reach, 8000 engagement",
      status: "completed",
      created_at: "2024-10-15T16:20:00.000Z",
      influencers_reached: 20,
    },
  ]);
  const router = useRouter();

  const {
    create: createCampaign,
    isPending: createCampaignLoading,
    isSuccess: createCampaignSuccess,
    error: createCampaignError,
  } = useCreate(axiosWithAuth, URLMapping["campaigns"], "withHeaders", {
    onSuccess: (data) => {
      alert("Campaign created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create User:", error);
    },
  });

  const handleCreateCampaign = (data: CampaignFormData) => {
    console.log("Campaign data:", data);
    createCampaign(data);
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    const { id } = campaign;
    setSelectedCampaign(campaign);
    router.push(`/campaigns?campaignId=${id}`);

    console.log("Selected campaign:", campaign);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-2">
            Manage your influencer marketing campaigns
          </p>
        </div>

        {/* Create Campaign Button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
          className="button-press transition-all hover-lift"
          sx={{
            borderColor: "var(--color-secondary)",
            color: "var(--color-secondary)",
            "&:hover": {
              borderColor: "var(--color-secondary)",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
            },
            "&:focus": {
              borderColor: "var(--color-secondary)",
            },
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Create Campaign
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 stagger-item card-hover">
        {campaigns.length === 0 ? (
          <EmptyView
            title="No campaigns"
            subtitle="Get started by creating a new campaign."
            buttonText="New Campaign"
            onButtonClick={() => setIsFormOpen(true)}
            buttonVariant="secondary"
          />
        ) : (
          <CampaignTable
            campaigns={campaigns}
            onCampaignSelect={handleCampaignSelect}
            loading={false}
          />
        )}
      </div>

      {/* Campaign Form Drawer */}
      <CampaignForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default CampaignsComponent;
