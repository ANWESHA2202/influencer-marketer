"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import { useFetchData, useCreate, useUpdate, useDelete } from "../hooks";
import { axiosWithAuth } from "../lib/axios";
import { URLMapping } from "../lib/constants";

export default function HooksDemo() {
  const [campaignName, setCampaignName] = useState("");
  const [updateData, setUpdateData] = useState({ name: "", description: "" });

  // 1. useFetchData Example - Fetch campaigns
  const {
    data: campaignsData,
    isLoading: campaignsLoading,
    refetch: refetchCampaigns,
    error: campaignsError,
  } = useFetchData(axiosWithAuth, URLMapping.campaigns, "withHeaders", {
    enabled: true,
    select: (data) => {
      // Transform the data
      if (data?.data && Array.isArray(data.data)) {
        return data.data.map((campaign: any) => ({
          id: campaign.id,
          name: campaign.name || "Untitled Campaign",
          status: campaign.status || "draft",
          createdAt: campaign.created_at,
        }));
      }
      return [];
    },
    onSuccess: (data) => {
      console.log("Campaigns fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to fetch campaigns:", error);
    },
  });

  // 2. useCreate Example - Create new campaign
  const {
    create: createCampaign,
    isPending: createLoading,
    isSuccess: createSuccess,
    error: createError,
  } = useCreate(axiosWithAuth, URLMapping["create-campaign"], "withHeaders", {
    onSuccess: (data) => {
      console.log("Campaign created:", data);
      setCampaignName("");
      refetchCampaigns(); // Refresh the list
    },
    onError: (error) => {
      console.error("Failed to create campaign:", error);
    },
    invalidateQueries: [URLMapping.campaigns], // Auto-invalidate campaigns list
  });

  // 3. useUpdate Example - Update campaign
  const {
    update: updateCampaign,
    isPending: updateLoading,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdate(axiosWithAuth, URLMapping["update-campaign"], "withHeaders", {
    onSuccess: (data) => {
      console.log("Campaign updated:", data);
      setUpdateData({ name: "", description: "" });
      refetchCampaigns(); // Refresh the list
    },
    onError: (error) => {
      console.error("Failed to update campaign:", error);
    },
    invalidateQueries: [URLMapping.campaigns],
  });

  // 4. useDelete Example - Delete campaign
  const {
    delete: deleteCampaign,
    isPending: deleteLoading,
    isSuccess: deleteSuccess,
    error: deleteError,
  } = useDelete(axiosWithAuth, URLMapping["delete-campaign"], "withHeaders", {
    onSuccess: (data) => {
      console.log("Campaign deleted:", data);
      refetchCampaigns(); // Refresh the list
    },
    onError: (error) => {
      console.error("Failed to delete campaign:", error);
    },
    invalidateQueries: [URLMapping.campaigns],
  });

  const handleCreateCampaign = () => {
    if (campaignName.trim()) {
      createCampaign({
        name: campaignName,
        description: `Campaign created at ${new Date().toISOString()}`,
        status: "draft",
      });
    }
  };

  const handleUpdateCampaign = (campaignId: string) => {
    if (updateData.name.trim()) {
      updateCampaign({
        id: campaignId,
        name: updateData.name,
        description: updateData.description,
      });
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      deleteCampaign({ id: campaignId });
    }
  };

  return (
    <Box className="p-6 max-w-6xl mx-auto">
      <Typography variant="h4" className="mb-6 text-center">
        React Query Hooks Demo
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fetch Data Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              📊 useFetchData Hook
            </Typography>

            <Box className="space-y-3">
              <Button
                variant="contained"
                onClick={() => refetchCampaigns()}
                disabled={campaignsLoading}
                fullWidth
              >
                {campaignsLoading ? (
                  <>
                    <CircularProgress size={20} className="mr-2" />
                    Loading...
                  </>
                ) : (
                  "Refetch Campaigns"
                )}
              </Button>

              {campaignsError && (
                <Alert severity="error">Error: {campaignsError.message}</Alert>
              )}

              {campaignsData && (
                <Box>
                  <Typography variant="subtitle2" className="mb-2">
                    Campaigns ({campaignsData.length}):
                  </Typography>
                  {campaignsData.map((campaign: any) => (
                    <Box key={campaign.id} className="p-2 border rounded mb-2">
                      <Typography variant="body2" className="font-semibold">
                        {campaign.name}
                      </Typography>
                      <Chip
                        label={campaign.status}
                        size="small"
                        color={
                          campaign.status === "active" ? "success" : "default"
                        }
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Create Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              ➕ useCreate Hook
            </Typography>

            <Box className="space-y-3">
              <TextField
                fullWidth
                label="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
              />

              <Button
                variant="contained"
                onClick={handleCreateCampaign}
                disabled={createLoading || !campaignName.trim()}
                fullWidth
              >
                {createLoading ? (
                  <>
                    <CircularProgress size={20} className="mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Campaign"
                )}
              </Button>

              {createSuccess && (
                <Alert severity="success">Campaign created successfully!</Alert>
              )}

              {createError && (
                <Alert severity="error">Error: {createError.message}</Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Update Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              ✏️ useUpdate Hook
            </Typography>

            <Box className="space-y-3">
              <TextField
                fullWidth
                label="Update Name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="New campaign name"
              />

              <TextField
                fullWidth
                label="Update Description"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="New description"
                multiline
                rows={2}
              />

              <Button
                variant="contained"
                onClick={() => handleUpdateCampaign("1")} // Demo with ID 1
                disabled={updateLoading || !updateData.name.trim()}
                fullWidth
              >
                {updateLoading ? (
                  <>
                    <CircularProgress size={20} className="mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Campaign (ID: 1)"
                )}
              </Button>

              {updateSuccess && (
                <Alert severity="success">Campaign updated successfully!</Alert>
              )}

              {updateError && (
                <Alert severity="error">Error: {updateError.message}</Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Delete Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              🗑️ useDelete Hook
            </Typography>

            <Box className="space-y-3">
              <Typography variant="body2" color="text.secondary">
                Delete operations are destructive. Use with caution.
              </Typography>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteCampaign("1")} // Demo with ID 1
                disabled={deleteLoading}
                fullWidth
              >
                {deleteLoading ? (
                  <>
                    <CircularProgress size={20} className="mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete Campaign (ID: 1)"
                )}
              </Button>

              {deleteSuccess && (
                <Alert severity="success">Campaign deleted successfully!</Alert>
              )}

              {deleteError && (
                <Alert severity="error">Error: {deleteError.message}</Alert>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider className="my-6" />

      {/* Usage Examples */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            📝 Usage Examples
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-2">
                1. useFetchData Hook:
              </Typography>
              <Box className="bg-gray-100 p-3 rounded font-mono text-sm">
                {`const { data, isLoading, refetch } = useFetchData(
  axiosWithAuth, 
  URLMapping["supported-languages"], 
  "withoutHeaders", 
  {
    enabled: false,
    select: (data) => data?.data?.map(item => ({ label: item.name, value: item.id })),
    onSuccess: (response) => console.log(response)
  }
);`}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-2">
                2. useCreate Hook:
              </Typography>
              <Box className="bg-gray-100 p-3 rounded font-mono text-sm">
                {`const { create: createItem, isPending } = useCreate(
  axiosWithAuth, 
  URLMapping.campaigns, 
  "withHeaders",
  {
    onSuccess: (data) => console.log('Created:', data),
    invalidateQueries: [URLMapping.campaigns]
  }
);`}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-2">
                3. useUpdate Hook:
              </Typography>
              <Box className="bg-gray-100 p-3 rounded font-mono text-sm">
                {`const { update: updateItem } = useUpdate(
  axiosWithAuth, 
  URLMapping["update-campaign"], 
  "withHeaders",
  {
    onSuccess: () => refetch(),
    invalidateQueries: [URLMapping.campaigns]
  }
);`}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-2">
                4. useDelete Hook:
              </Typography>
              <Box className="bg-gray-100 p-3 rounded font-mono text-sm">
                {`const { delete: deleteItem } = useDelete(
  axiosWithAuth, 
  URLMapping["delete-campaign"], 
  "withHeaders",
  {
    onSuccess: () => refetch(),
    invalidateQueries: [URLMapping.campaigns]
  }
);`}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
