"use client";
import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface EmptyViewProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?: "primary" | "secondary";
}

const EmptyView: React.FC<EmptyViewProps> = ({
  title,
  subtitle,
  icon,
  buttonText,
  onButtonClick,
  buttonVariant = "primary",
}) => {
  const defaultIcon = (
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );

  return (
    <div className="text-center py-12">
      {/* Icon */}
      {icon || defaultIcon}

      {/* Title */}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>

      {/* Subtitle */}
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}

      {/* Button */}
      {buttonText && onButtonClick && (
        <div className="mt-6">
          {buttonVariant === "primary" ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onButtonClick}
              sx={{
                backgroundColor: "var(--color-primary)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-hover)",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={onButtonClick}
              sx={{
                borderColor: "var(--color-secondary)",
                color: "var(--color-secondary)",
                "&:hover": {
                  borderColor: "var(--color-secondary)",
                  backgroundColor: "rgba(236, 72, 153, 0.1)",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyView;
