"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CampaignForm from "./CampaignForm";
import CampaignTable from "./CampaignTable";
import EmptyView from "../common/EmptyView";

interface CampaignFormData {
  title: string;
  description: string;
  brand_name: string;
  campaign_type: string;
  budget: number | "";
  start_date: string;
  end_date: string;
  target_audience: Record<string, any>;
  content_requirements: Record<string, any>;
  deliverables: Record<string, any>;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  campaign_type: string;
  budget: number;
  start_date: string;
  end_date: string;
  target_audience: Record<string, any>;
  content_requirements: Record<string, any>;
  deliverables: Record<string, any>;
  status: "draft" | "active" | "paused" | "completed" | "cancelled";
  created_at: string;
  influencers_reached: number;
}

const CampaignsComponent = () => {
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
      target_audience: { age: "18-35", interests: ["fashion", "lifestyle"] },
      content_requirements: { posts: 3, stories: 5, reels: 2 },
      deliverables: { reach: 100000, engagement: 5000 },
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
      target_audience: { age: "25-45", interests: ["technology", "gadgets"] },
      content_requirements: { reviews: 2, unboxing: 1, tutorials: 1 },
      deliverables: { reach: 200000, engagement: 10000 },
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
      target_audience: { age: "20-40", interests: ["fitness", "health"] },
      content_requirements: { daily_posts: 30, workout_videos: 10 },
      deliverables: { reach: 75000, engagement: 7500 },
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
      target_audience: { age: "25-50", interests: ["shopping", "gifts"] },
      content_requirements: { gift_guides: 5, reviews: 10 },
      deliverables: { reach: 150000, engagement: 8000 },
      status: "completed",
      created_at: "2024-10-15T16:20:00.000Z",
      influencers_reached: 20,
    },
  ]);

  const handleCreateCampaign = (data: CampaignFormData) => {
    console.log("Campaign data:", data);

    // Create new campaign with generated ID and additional fields
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      ...data,
      budget:
        typeof data.budget === "string"
          ? Number(data.budget) || 0
          : data.budget,
      status: "draft",
      created_at: new Date().toISOString(),
      influencers_reached: 0,
    };

    // Add to campaigns list
    setCampaigns((prev) => [newCampaign, ...prev]);

    alert("Campaign created successfully!");
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    console.log("Selected campaign:", campaign);
    // You can add logic here to handle campaign selection
    // For example, open a detail view or edit form
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
