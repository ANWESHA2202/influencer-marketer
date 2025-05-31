"use client";

import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreatorCard from "./CreatorCard";
import CreatorModal from "./CreatorModal";
import { Creator } from "./types";
import creatorsData from "./creators.json";

const CreatorLists = () => {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCreator(null);
  };

  return (
    <div className="p-6">
      <Grid container spacing={3}>
        {creatorsData.map((creator) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={creator.id}>
            <CreatorCard
              creator={creator as Creator}
              onClick={() => handleCreatorClick(creator as Creator)}
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
