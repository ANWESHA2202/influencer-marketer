"use client";
import React, { useState, useEffect } from "react";
import CreatorLists from "./CreatorLists";
import SearchFilters from "./SearchFilters";

const HomeComponent = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFiltersChange = (filters: any, searchQuery: string) => {
    // Build query string properly
    const queryParams = new URLSearchParams();

    if (filters.query) queryParams?.append("query", filters.query);
    if (filters.category) queryParams?.append("category", filters.category);
    if (filters.min_followers)
      queryParams?.append("min_followers", filters.min_followers);
    if (filters.max_followers)
      queryParams.append("max_followers", filters.max_followers);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.min_engagement_rate)
      queryParams.append("min_engagement_rate", filters.min_engagement_rate);
    if (filters.max_rate) queryParams.append("max_rate", filters.max_rate);
    queryParams.append("query", searchQuery || " ");

    // Always add limit
    queryParams.append("limit", "20");

    const queryString = queryParams.toString();
    setSearchParams(queryString);
  };

  useEffect(() => {
    const queryString = searchParams.toString();
    setSearchQuery(queryString);
  }, [searchParams]);

  return (
    <>
      <div>
        <SearchFilters onFiltersChange={handleFiltersChange} />
        <CreatorLists searchParams={searchParams} />
      </div>
    </>
  );
};

export default HomeComponent;
