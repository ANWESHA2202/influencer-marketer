"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CreatorCard from "./CreatorCard";
import CreatorCardSkeleton from "./CreatorCardSkeleton";
import CreatorModal from "./CreatorModal";
import { Creator } from "./types";
import creatorsData from "./creators.json";
import { URLMapping } from "@/lib/constants";
import { axiosWithAuth } from "@/lib/axios";
import { useFetchData } from "@/hooks/useFetchData";
import EmptyView from "../common/EmptyView";

const CreatorLists = ({ searchParams }: { searchParams: string }) => {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Construct the API URL with search parameters
  const apiUrl = searchParams
    ? `${URLMapping["creators-list"]}?${searchParams}`
    : `${URLMapping["creators-list"]}?limit=20&query=${" "}`;

  const {
    data: creatorsApiData,
    isLoading: creatorsLoading,
    refetch: refetchCreators,
    error: creatorsError,
  } = useFetchData(axiosWithAuth, apiUrl, "withHeaders", {
    enabled: true,
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
    onSuccess: (data) => {
      // Remove console.log statement
    },
    onError: (error) => {
      console.error("Failed to fetch creators:", error);
    },
  });

  // Use API data if available, otherwise fall back to local data
  const displayData = creatorsApiData || creatorsData;

  useEffect(() => {
    refetchCreators();
  }, [searchParams, refetchCreators]);

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCreator(null);
  };

  if (!creatorsLoading && (creatorsError || !displayData)) {
    console.error("Error loading creators:", creatorsError);
    // Fall back to local data on error
    return <EmptyView title="No creators found" />;
  }

  return (
    <div>
      <Grid container spacing={3}>
        {creatorsLoading
          ? // Show skeleton cards while loading
            Array.from({ length: 8 }).map((_, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={`skeleton-${index}`}
              >
                <CreatorCardSkeleton />
              </Grid>
            ))
          : // Show actual creator cards when loaded
            displayData?.map((creator: Creator) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={creator.id}>
                <CreatorCard
                  creator={creator}
                  onClick={() => handleCreatorClick(creator)}
                />
              </Grid>
            ))}
      </Grid>

      <CreatorModal
        creator={selectedCreator}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CreatorLists;
