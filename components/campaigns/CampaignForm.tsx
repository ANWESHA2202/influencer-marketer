"use client";
import React, { useState } from "react";
import { Drawer, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CampaignFormData) => void;
}

interface CampaignFormData {
  title: string;
  description: string;
  brand_name: string;
  campaign_type: string;
  budget: number | "";
  start_date: string;
  end_date: string;
  target_audience: Record<string, any>;
  content_requirements: Record<string, any>;
  deliverables: Record<string, any>;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    brand_name: "",
    campaign_type: "",
    budget: "",
    start_date: "",
    end_date: "",
    target_audience: {},
    content_requirements: {},
    deliverables: {},
  });

  const [targetAudienceText, setTargetAudienceText] = useState("");
  const [contentRequirementsText, setContentRequirementsText] = useState("");
  const [deliverablesText, setDeliverablesText] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse JSON fields
    try {
      const finalData = {
        ...formData,
        budget:
          typeof formData.budget === "string"
            ? Number(formData.budget) || 0
            : formData.budget,
        target_audience: targetAudienceText
          ? JSON.parse(targetAudienceText)
          : {},
        content_requirements: contentRequirementsText
          ? JSON.parse(contentRequirementsText)
          : {},
        deliverables: deliverablesText ? JSON.parse(deliverablesText) : {},
      };
      onSubmit(finalData);
      onClose();
    } catch (error) {
      alert("Please ensure JSON fields are properly formatted");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "100%", md: "600px" },
          maxWidth: "100vw",
        },
        className: isOpen ? "drawer-enter" : "",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          className="stagger-item"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Create New Campaign
          </Typography>
          <IconButton
            onClick={onClose}
            className="transition-colors hover-scale"
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "#4b5563",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ flex: 1, overflow: "auto", p: 3, pb: 0 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="stagger-item">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary transition-colors"
                style={
                  {
                    "--primary-color": "#6366F1",
                  } as React.CSSProperties
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder="Enter campaign title"
              />
            </div>

            {/* Description */}
            <div className="stagger-item">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder="Describe your campaign"
              />
            </div>

            {/* Brand Name */}
            <div className="stagger-item">
              <label
                htmlFor="brand_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Brand Name *
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                required
                value={formData.brand_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder="Enter brand name"
              />
            </div>

            {/* Campaign Type */}
            <div className="stagger-item">
              <label
                htmlFor="campaign_type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Campaign Type *
              </label>
              <select
                id="campaign_type"
                name="campaign_type"
                required
                value={formData.campaign_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
              >
                <option value="">Select campaign type</option>
                <option value="brand_awareness">Brand Awareness</option>
                <option value="product_launch">Product Launch</option>
                <option value="engagement">Engagement</option>
                <option value="conversion">Conversion</option>
                <option value="content_creation">Content Creation</option>
              </select>
            </div>

            {/* Budget */}
            <div className="stagger-item">
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Budget (INR) *
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                required
                min="0"
                step="0.01"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder="0.00"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-item">
              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  name="start_date"
                  required
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366F1";
                    e.target.style.borderWidth = "1px";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.borderWidth = "1px";
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  name="end_date"
                  required
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366F1";
                    e.target.style.borderWidth = "1px";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.borderWidth = "1px";
                  }}
                />
              </div>
            </div>

            {/* Target Audience */}
            <div className="stagger-item">
              <label
                htmlFor="target_audience"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Target Audience (JSON format)
              </label>
              <textarea
                id="target_audience"
                rows={3}
                value={targetAudienceText}
                onChange={(e) => setTargetAudienceText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-mono text-sm transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder='{"age_range": "18-35", "interests": ["fashion", "lifestyle"]}'
              />
            </div>

            {/* Content Requirements */}
            <div className="stagger-item">
              <label
                htmlFor="content_requirements"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content Requirements (JSON format)
              </label>
              <textarea
                id="content_requirements"
                rows={3}
                value={contentRequirementsText}
                onChange={(e) => setContentRequirementsText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-mono text-sm transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder='{"format": "video", "duration": "30-60s", "style": "casual"}'
              />
            </div>

            {/* Deliverables */}
            <div className="stagger-item">
              <label
                htmlFor="deliverables"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Deliverables (JSON format)
              </label>
              <textarea
                id="deliverables"
                rows={3}
                value={deliverablesText}
                onChange={(e) => setDeliverablesText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none font-mono text-sm transition-colors"
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366F1";
                  e.target.style.borderWidth = "1px";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.borderWidth = "1px";
                }}
                placeholder='{"posts": 3, "stories": 5, "reels": 2}'
              />
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 left-0 right-0 bg-white pb-2">
              <div className="flex justify-start space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-secondary border border-transparent rounded-md shadow-sm hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CampaignForm;
