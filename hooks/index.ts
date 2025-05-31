// Export all custom React Query hooks
export { useFetchData } from "./useFetchData";
export { useCreate } from "./useCreate";
export { useUpdate } from "./useUpdate";
export { useDelete } from "./useDelete";

// Re-export commonly used React Query hooks and utilities
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
