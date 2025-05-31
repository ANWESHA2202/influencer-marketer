export interface Creator {
  id: number;
  email: string;
  username: string;
  full_name: string;
  bio: string;
  location: string;
  category: string;
  instagram_handle: string | null;
  instagram_followers: number | null;
  youtube_handle: string | null;
  youtube_subscribers: number | null;
  tiktok_handle: string | null;
  tiktok_followers: number | null;
  twitter_handle: string | null;
  twitter_followers: number | null;
  base_rate: number;
  engagement_rate: number;
  languages: string[];
  content_types: string[];
  is_verified: boolean;
  is_active: boolean;
  profile_image_url: string;
  media_kit_url: string;
  created_at: string;
  updated_at: string;
}
