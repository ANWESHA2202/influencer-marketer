import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";

interface UseFetchDataOptions<T = any>
  extends Omit<
    UseQueryOptions<AxiosResponse<T>, Error, any>,
    "queryKey" | "queryFn"
  > {
  enabled?: boolean;
  select?: (data: AxiosResponse<T>) => any;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

type HeaderType = "withHeaders" | "withoutHeaders";

export function useFetchData<T = any>(
  axiosInstance: AxiosInstance,
  url: string,
  headerType: "withHeaders" | "withoutHeaders" = "withHeaders",
  options: UseFetchDataOptions<T> = {}
) {
  const {
    enabled = true,
    select,
    onSuccess,
    onError,
    ...queryOptions
  } = options;

  const queryResult = useQuery({
    queryKey: [url, headerType],
    queryFn: async (): Promise<AxiosResponse<T>> => {
      try {
        const config =
          headerType === "withoutHeaders"
            ? { headers: {} }
            : {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              };

        const response = await axiosInstance.get<T>(url, config);

        return response;
      } catch (error: any) {
        // Enhanced error handling with better context
        const enhancedError = new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch data"
        );

        // Add additional error context for debugging
        (enhancedError as any).status = error.response?.status;
        (enhancedError as any).statusText = error.response?.statusText;
        (enhancedError as any).url = url;
        (enhancedError as any).originalError = error;

        throw enhancedError;
      }
    },
    enabled,
    select,
    // Add retry configuration to handle transient errors gracefully
    retry: false,
    retryDelay: 0,
    // Prevent background refetching on window focus for failed queries
    refetchOnWindowFocus: false,
    ...queryOptions,
  });

  // Handle success callback safely
  if (queryResult.isSuccess && queryResult.data && onSuccess) {
    try {
      const selectedData = select ? select(queryResult.data) : queryResult.data;
      onSuccess(selectedData);
    } catch (error) {
      console.error(`❌ Error in onSuccess callback for ${url}:`, error);
      // Don't throw here - just log the error
    }
  }

  // Handle error callback safely
  if (queryResult.isError && onError) {
    try {
      onError(queryResult.error);
    } catch (error) {
      console.error(`❌ Error in onError callback for ${url}:`, error);
      // Don't throw here - just log the error
    }
  }

  return {
    ...queryResult,
    // Custom refetch function that matches the expected API
    refetch: queryResult.refetch,
    // Add helper properties for better error handling
    isNetworkError: queryResult.error?.message?.includes("Network Error"),
    isServerError: (queryResult.error as any)?.status >= 500,
    isClientError:
      (queryResult.error as any)?.status >= 400 &&
      (queryResult.error as any)?.status < 500,
  };
}

// Export with the exact naming convention expected
export default useFetchData;
