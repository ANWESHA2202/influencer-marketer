"use client";
import React from "react";
import CreatorLists from "./CreatorLists";
import SearchFilters from "./SearchFilters";

const HomeComponent = () => {
  const handleFiltersChange = (filters: any) => {
    // This will be implemented later when we add actual filtering logic
    console.log("Filters changed:", filters);
  };

  const handleAISearchChange = (searchPrompt: string, isAIEnabled: boolean) => {
    // This will be implemented later when we add AI search functionality
    console.log("AI Search:", { searchPrompt, isAIEnabled });
  };

  return (
    <div>
      <SearchFilters
        onFiltersChange={handleFiltersChange}
        onAISearchChange={handleAISearchChange}
      />
      <CreatorLists />
    </div>
  );
};

export default HomeComponent;
