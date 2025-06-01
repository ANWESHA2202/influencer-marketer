"use client";
import CampaignsComponent from "@/components/campaigns";
import CampaignInfluencerTable from "@/components/campaigns/CampaignInfluencerTable";
import InfluencerTracker from "@/components/campaigns/InfluencerTracker";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CampaignsPage = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");

  return campaignId ? (
    <InfluencerTracker campaignId={campaignId} />
  ) : (
    <CampaignsComponent />
  );
};

export default CampaignsPage;
