import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";

interface UseCreateOptions<TData = any, TVariables = any>
  extends Omit<
    UseMutationOptions<AxiosResponse<TData>, Error, TVariables>,
    "mutationFn"
  > {
  onSuccess?: (data: AxiosResponse<TData>, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  invalidateQueries?: string[];
}

export function useCreate<TData = any, TVariables = any>(
  axiosInstance: AxiosInstance,
  url: string,
  headerType: "withHeaders" | "withoutHeaders" = "withHeaders",
  options: UseCreateOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  const mutation = useMutation({
    mutationFn: async (data: TVariables): Promise<AxiosResponse<TData>> => {
      try {
        console.log(`🚀 Starting CREATE request: ${url}`, {
          headerType,
          dataKeys:
            typeof data === "object" && data ? Object.keys(data) : "N/A",
        });

        const config =
          headerType === "withoutHeaders"
            ? { headers: {} }
            : {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              };

        const response = await axiosInstance.post<TData>(url, data, config);

        console.log(`✅ CREATE request successful: ${url}`, {
          status: response.status,
          statusText: response.statusText,
          hasData: !!response.data,
        });

        return response;
      } catch (error: any) {
        console.error(`❌ CREATE request failed: ${url}`, {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          requestData: data,
        });

        // Create a safe error with better messaging
        const safeError = new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to create resource"
        );

        // Add additional error context
        (safeError as any).status = error.response?.status;
        (safeError as any).statusText = error.response?.statusText;
        (safeError as any).originalError = error;

        throw safeError;
      } finally {
        console.log(`🏁 CREATE request completed: ${url}`);
      }
    },
    onSuccess: async (data, variables, context) => {
      try {
        console.log(`🎉 CREATE mutation successful for: ${url}`);

        // Invalidate related queries safely
        if (invalidateQueries.length > 0) {
          console.log(`🔄 Invalidating queries:`, invalidateQueries);
          try {
            await Promise.allSettled(
              invalidateQueries.map((queryKey) =>
                queryClient.invalidateQueries({ queryKey: [queryKey] })
              )
            );
          } catch (invalidateError) {
            console.warn(
              `⚠️ Some queries failed to invalidate:`,
              invalidateError
            );
            // Don't throw here - query invalidation failure shouldn't break the UI
          }
        }

        // Call custom onSuccess callback safely
        if (onSuccess) {
          try {
            onSuccess(data, variables);
          } catch (callbackError) {
            console.error(
              `❌ Error in CREATE onSuccess callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (error) {
        console.error(
          `❌ Error in CREATE onSuccess handler for ${url}:`,
          error
        );
        // Don't throw here - keep the UI stable
      }
    },
    onError: (error, variables, context) => {
      try {
        console.error(`💥 CREATE mutation failed for: ${url}`, {
          error: error.message,
          variables,
        });

        // Call custom onError callback safely
        if (onError) {
          try {
            onError(error, variables);
          } catch (callbackError) {
            console.error(
              `❌ Error in CREATE onError callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (handlerError) {
        console.error(
          `❌ Error in CREATE onError handler for ${url}:`,
          handlerError
        );
        // Don't throw here - keep the UI stable
      }
    },
    // Add retry logic for transient errors
    retry: false,
    retryDelay: 0,
    ...mutationOptions,
  });

  return {
    ...mutation,
    // Provide a more descriptive mutate function
    create: mutation.mutate,
    createAsync: mutation.mutateAsync,
    // Add helper properties for better error handling
    isNetworkError: mutation.error?.message?.includes("Network Error"),
    isServerError: (mutation.error as any)?.status >= 500,
    isClientError:
      (mutation.error as any)?.status >= 400 &&
      (mutation.error as any)?.status < 500,
  };
}

export default useCreate;
