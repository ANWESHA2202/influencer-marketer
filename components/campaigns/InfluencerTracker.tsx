import React, { useState } from "react";
import CampaignInfluencerTable, {
  CampaignInfluencer,
} from "./CampaignInfluencerTable";
import { Button } from "@mui/material";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import NegotiationComparison from "./NegotiationComparison";
import { useFetchData } from "@/hooks";
import { axiosWithAuth } from "@/lib/axios";
import { URLMapping } from "@/lib/constants";

const creatordata: CampaignInfluencer[] = [
  {
    campaign_id: 1,
    creator_id: 101,
    offered_rate: 500,
    deliverables_total: 2,
    id: 1,
    negotiated_rate: 700,
    final_rate: 850,
    status: "invited",
    invited_at: "2025-05-31T21:40:20.596Z",
    accepted_at: "2025-06-01T12:00:00.000Z",
    completed_at: "2025-06-02T14:00:00.000Z",
    deliverables_completed: 1,
    summary: "Agent chat summary Note",
    aiMatch: 81,
  },
  {
    campaign_id: 1,
    creator_id: 102,
    offered_rate: 600,
    deliverables_total: 3,
    id: 2,
    negotiated_rate: 800,
    final_rate: 900,
    status: "accepted",
    invited_at: "2025-05-31T21:40:20.596Z",
    accepted_at: "2025-06-01T14:00:00.000Z",
    completed_at: "2025-06-03T16:00:00.000Z",
    deliverables_completed: 3,
    summary: "Agent Summary Note",
    aiMatch: 61,
  },
];

const InfluencerTracker = ({ campaignId }: { campaignId: string }) => {
  const [creatorsConnected, setCreatorsConnected] = useState(creatordata);
  const [showComparison, setShowComparison] = useState(false);
  const url = URLMapping["campaign-creator"].replace(
    "{campaign_id}",
    campaignId
  );

  // Fetch  Campaigns creator
  const {
    data: creatorsData,
    isLoading: loading,
    refetch: refetchData,
    error: creatorDataError,
  } = useFetchData(axiosWithAuth, url, "withHeaders", {
    enabled: true,
    select: (data) => {
      // Transform the data
      console.log(data);
      return [];
    },
    onSuccess: (data) => {
      console.log("Campaigns Creator fetched:", data);
    },
    onError: (error) => {
      console.error("Failed to fetch campaigns creator:", error);
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Summer Fashion Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Track Your Deals with Selected Creator
          </p>
        </div>
        {/* Create Campaign Button */}
        <Button
          variant="outlined"
          startIcon={<CompareArrowsRoundedIcon />}
          onClick={() => setShowComparison(true)}
          className="button-press transition-all hover-lift"
          sx={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            "&:hover": {
              borderColor: "var(--color-primary)",
            },
            "&:focus": {
              borderColor: "var(--color-primary)",
            },
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Compare
        </Button>
      </div>

      <CampaignInfluencerTable
        creatorsConnected={creatorsConnected}
        loading={false}
        onCreatorSelected={() => {}}
      />

      <NegotiationComparison
        influencers={creatorsConnected}
        onClose={() => setShowComparison(false)}
        open={showComparison}
      />
    </div>
  );
};

export default InfluencerTracker;
