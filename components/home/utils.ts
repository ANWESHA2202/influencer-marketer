export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Sample data for dropdowns - these can be replaced with actual data later
export const categories = [
  "Fashion",
  "Beauty",
  "Fitness",
  "Food",
  "Travel",
  "Technology",
  "Gaming",
  "Lifestyle",
  "Business",
  "Education",
];

export const locations = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
];

export const genders = ["Male", "Female", "Non-binary", "Other"];
