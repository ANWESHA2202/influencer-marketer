"use client";
import React from "react";
import CreatorLists from "./CreatorLists";
import SearchFilters from "./SearchFilters";
import { useAuth } from "@/context/AuthContext";
import LandingPage from "./LandingPage";

const HomeComponent = () => {
  const { user } = useAuth();

  const handleFiltersChange = (filters: any) => {
    // This will be implemented later when we add actual filtering logic
    console.log("Filters changed:", filters);
  };

  const handleAISearchChange = (searchPrompt: string, isAIEnabled: boolean) => {
    // This will be implemented later when we add AI search functionality
    console.log("AI Search:", { searchPrompt, isAIEnabled });
  };

  return (
    <>
      {user ? (
        <div>
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            onAISearchChange={handleAISearchChange}
          />
          <CreatorLists />
        </div>
      ) : (
        <div>
          <LandingPage />
        </div>
      )}
    </>
  );
};

export default HomeComponent;
