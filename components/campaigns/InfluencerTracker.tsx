import React, { useEffect, useState } from "react";
import CampaignInfluencerTable, {
  CampaignInfluencer,
} from "./CampaignInfluencerTable";
import { Button, Modal } from "@mui/material";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import NegotiationComparison from "./NegotiationComparison";
import { useFetchData } from "@/hooks";
import { axiosWithAuth } from "@/lib/axios";
import { URLMapping } from "@/lib/constants";
import StripeContainer from "../payments/StripeContainer";
import TableSkeleton from "./TableSkeleton";

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

function enrichCreatorData(creatorData: any, allcreator: any) {
  const matchedCreator = allcreator.find(
    (c: any) => c.id === creatorData.creator_id
  );

  if (!matchedCreator) return creatorData;

  const enrichedData = {
    ...creatorData,
    ...matchedCreator,
    name: matchedCreator.full_name, // map full_name to name
  };

  // Ensure original keys in creatorData are retained, even if undefined in matchedCreator
  for (const key in creatorData) {
    if (!(key in enrichedData)) {
      enrichedData[key] = creatorData[key];
    }
  }

  return enrichedData;
}
const InfluencerTracker = ({
  campaignId,
  selectedCampaign,
  setSelectedCampaign,
}: {
  campaignId: string;
  selectedCampaign: any;
  setSelectedCampaign: any;
}) => {
  const [creatorsConnected, setCreatorsConnected] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isLoadingTableData, setIsLoadingTableData] = useState(true);
  const url = URLMapping["campaign-creator"].replace(
    "{campaign_id}",
    campaignId
  );
  const campaignDetailUrl = URLMapping["campaign-details"].replace(
    ":id",
    campaignId
  );
  const allCreatorApiUrl = `${
    URLMapping["creators-list"]
  }?limit=100&query=${" "}`;
  const {
    data: campaignDetail,
    isLoading: campaignloading,
    refetch: refetchCampaignData,
    error: campaignDataError,
  } = useFetchData(axiosWithAuth, `${campaignDetailUrl}`, "withHeaders", {
    enabled: false,
    select: (data) => {
      return data;
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Failed to fetch campaign detail:", error);
    },
  });

  // Fetch Campaigns creator
  const {
    data: creatorsData,
    isLoading: loading,
    refetch: refetchCreatorData,
    error: creatorDataError,
  } = useFetchData(axiosWithAuth, url, "withHeaders", {
    enabled: false,
    select: (data) => {
      return data;
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const {
    data: creatorsApiData,
    isLoading: creatorsLoading,
    refetch: refetchCreators,
    error: creatorsError,
  } = useFetchData(axiosWithAuth, allCreatorApiUrl, "withHeaders", {
    enabled: false,
    select: (data) => {
      // Transform API data to match Creator interface and add similarity scores
      return (
        data?.data?.creators?.map((creator: any, index: number) => ({
          ...creator,
          // Add similarity score as match percentage
          match_score: data?.data?.similarity_scores?.[index]
            ? Math.round(data?.data?.similarity_scores[index] * 100)
            : null,
        })) || []
      );
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Failed to fetch creators:", error);
    },
  });

  const callRefetch = async () => {
    try {
      const { data } = await refetchCampaignData();
      if (data?.data) {
        setSelectedCampaign(data?.data);
      }
      const allCreators = await refetchCreators();
      const allData = allCreators.data;
      const creators = await refetchCreatorData();
      if (creators.data.data) {
        const temp: any = [];
        creators.data.data.map((credt: any) => {
          const updatedData = enrichCreatorData(credt, allData);
          temp.push(updatedData);
        });

        setCreatorsConnected(temp);
        setIsLoadingTableData(false);
      }
    } catch (e) {
      console.error("Error in fetching");
    }
  };
  useEffect(() => {
    callRefetch();
  }, []);
  const handlePaymentInitiate = () => {
    setIsPayment(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 stagger-item">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCampaign?.title || ""}
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
      {isLoadingTableData && !creatorDataError ? (
        <TableSkeleton />
      ) : (
        <CampaignInfluencerTable
          creatorsConnected={creatorsConnected}
          loading={false}
          onCreatorSelected={() => {}}
          onPaymentInitiated={handlePaymentInitiate}
        />
      )}

      <NegotiationComparison
        influencers={creatorsConnected}
        onClose={() => setShowComparison(false)}
        open={showComparison}
      />
      <Modal open={isPayment}>
        <StripeContainer />
      </Modal>
    </div>
  );
};

export default InfluencerTracker;
