// URL Mappings for API endpoints
export const URLMapping = {
  // Authentication
  login: "/auth/login",
  register: "/auth/register/user",
  registerCreator: "/auth/register/creator",
  logout: "/auth/logout",
  "refresh-token": "/auth/refresh",

  // Creators
  "creators-list": "/creators/search",

  // User Management
  profile: "/user/profile",
  "update-profile": "/user/profile",

  // Influencers
  influencers: "/influencers",
  "influencer-details": "/influencers/:id",
  "influencer-search": "/influencers/search",
  "influencer-categories": "/influencers/categories",

  // Campaigns
  campaigns: "/campaigns",
  "campaign-details": "/campaigns/:id",
  "create-campaign": "/campaigns",
  "update-campaign": "/campaigns/:id",
  "delete-campaign": "/campaigns/:id",
  "campaign-creator" : "/campaigns/{campaign_id}/creators",

  // Analytics
  "campaign-analytics": "/analytics/campaigns/:id",
  "influencer-analytics": "/analytics/influencers/:id",
  "dashboard-stats": "/analytics/dashboard",

  // Settings
  "supported-languages": "/settings/languages",
  countries: "/settings/countries",
  categories: "/settings/categories",

  // Notifications
  notifications: "/notifications",
  "mark-notification-read": "/notifications/:id/read",
} as const;

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common API Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export const CATEGORIES = [
  "Fashion & Beauty",
  "Fitness & Health",
  "Food & Cooking",
  "Travel & Lifestyle",
  "Technology",
  "Gaming",
  "Education",
  "Entertainment",
  "Business & Finance",
  "Art & Design",
  "Music",
  "Sports",
  "Parenting",
  "Home & Garden",
  "Automotive",
];

export const CONTENT_TYPES = [
  "Photos",
  "Videos",
  "Stories",
  "Reels",
  "Live Streams",
  "Blog Posts",
  "Tutorials",
  "Reviews",
  "Unboxing",
  "Behind the Scenes",
];

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
];
