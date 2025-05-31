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
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

export const genders = ["Male", "Female", "Non-binary", "Other"];
