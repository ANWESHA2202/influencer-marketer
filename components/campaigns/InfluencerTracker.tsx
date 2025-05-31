import React from "react";
import CampaignInfluencerTable from "./CampaignInfluencerTable";

const InfluencerTracker = ({ campaignId }: { campaignId: string }) => {
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
      </div>

      <CampaignInfluencerTable campaignId={campaignId} />
    </div>
  );
};

export default InfluencerTracker;
