"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CampaignForm from "./CampaignForm";
import CampaignTable from "./CampaignTable";
import EmptyView from "../common/EmptyView";
import { useRouter } from "next/navigation";
import { URLMapping } from "@/lib/constants";
import { axiosWithAuth } from "@/lib/axios";
import useCreate from "@/hooks/useCreate";
import useFetchData from "@/hooks/useFetchData";

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
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  const {
    create: createCampaign,
    isPending: createCampaignLoading,
    isSuccess: createCampaignSuccess,
    error: createCampaignError,
  } = useCreate(axiosWithAuth, URLMapping["campaigns"], "withHeaders", {
    onSuccess: (data) => {
      alert("Campaign created successfully!");
      setIsFormOpen(false);
      refetchCampaignData();
    },
    onError: (error) => {
      console.error("Failed to create User:", error);
    },
  });

  const {
    data: campaignData,
    isLoading: campaignDataLoading,
    refetch: refetchCampaignData,
    error: campaignDataError,
  } = useFetchData(axiosWithAuth, URLMapping["campaigns"], "withHeaders", {
    enabled: true,
    select: (data) => {
      console.log(data, "data");
      return data || [];
    },
    onSuccess: (data) => {
      console.log("Campaigns fetched:", data);
      setCampaigns(data || []);
    },
    onError: (error) => {
      console.error("Failed to fetch campaigns:", error);
    },
  });

  const handleCreateCampaign = (data: CampaignFormData) => {
    createCampaign(data);
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    const { id } = campaign;
    setSelectedCampaign(campaign);
    router.push(`/campaigns?campaignId=${id}`);
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
      <div>
        {campaignDataLoading ? (
          <CampaignTable
            campaigns={[]}
            onCampaignSelect={handleCampaignSelect}
            loading={true}
          />
        ) : campaigns.length === 0 ? (
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
        loading={createCampaignLoading}
      />
    </div>
  );
};

export default CampaignsComponent;
