"use client";
import CampaignsComponent from "@/components/campaigns";
import InfluencerTracker from "@/components/campaigns/InfluencerTracker";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const CampaignsPage = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  return campaignId ? (
    <InfluencerTracker
      campaignId={campaignId}
      selectedCampaign={selectedCampaign}
      setSelectedCampaign={setSelectedCampaign}
    />
  ) : (
    <CampaignsComponent setSelectedCampaign={setSelectedCampaign} />
  );
};

export default CampaignsPage;
