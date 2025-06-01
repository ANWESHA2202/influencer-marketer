import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
        console.log(`🚀 Starting API call: ${url}`);

        const config =
          headerType === "withoutHeaders"
            ? { headers: {} }
            : {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              };

        const response = await axiosInstance.get<T>(url, config);

        console.log(`✅ API call successful: ${url}`, {
          status: response.status,
          dataLength: Array.isArray(response.data)
            ? response.data.length
            : "N/A",
        });

        return response;
      } catch (error: any) {
        console.error(`❌ API call failed: ${url}`, {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });

        // Return a safe error response instead of throwing
        // This prevents UI crashes while still allowing React Query to handle the error state
        const safeError = new Error(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred"
        );

        // Add additional error context
        (safeError as any).status = error.response?.status;
        (safeError as any).statusText = error.response?.statusText;
        (safeError as any).originalError = error;

        throw safeError;
      } finally {
        console.log(`🏁 API call completed: ${url}`);
      }
    },
    enabled,
    select,
    // Add retry configuration to handle transient errors gracefully
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
