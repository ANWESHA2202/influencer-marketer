import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface UseUpdateOptions<TData = any, TVariables = any>
  extends Omit<
    UseMutationOptions<AxiosResponse<TData>, Error, TVariables>,
    "mutationFn"
  > {
  onSuccess?: (data: AxiosResponse<TData>, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  invalidateQueries?: string[];
  method?: "PUT" | "PATCH";
}

export function useUpdate<TData = any, TVariables = any>(
  axiosInstance: AxiosInstance,
  url: string,
  headerType: "withHeaders" | "withoutHeaders" = "withHeaders",
  options: UseUpdateOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,
    invalidateQueries = [],
    method = "PUT",
    ...mutationOptions
  } = options;

  const mutation = useMutation({
    mutationFn: async (data: TVariables): Promise<AxiosResponse<TData>> => {
      try {
        // Handle URL parameter replacement (e.g., /users/:id)
        let finalUrl = url;
        if (typeof data === "object" && data && "id" in data) {
          finalUrl = url.replace(":id", String((data as any).id));
        }

        console.log(`🚀 Starting ${method} request: ${finalUrl}`, {
          originalUrl: url,
          headerType,
          method,
          dataKeys:
            typeof data === "object" && data ? Object.keys(data) : "N/A",
        });

        const config =
          headerType === "withoutHeaders"
            ? { headers: {} }
            : {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              };

        let response: AxiosResponse<TData>;

        if (method === "PATCH") {
          response = await axiosInstance.patch<TData>(finalUrl, data, config);
        } else {
          response = await axiosInstance.put<TData>(finalUrl, data, config);
        }

        console.log(`✅ ${method} request successful: ${finalUrl}`, {
          status: response.status,
          statusText: response.statusText,
          hasData: !!response.data,
        });

        return response;
      } catch (error: any) {
        console.error(`❌ ${method} request failed: ${url}`, {
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
            "Failed to update resource"
        );

        // Add additional error context
        (safeError as any).status = error.response?.status;
        (safeError as any).statusText = error.response?.statusText;
        (safeError as any).originalError = error;

        throw safeError;
      } finally {
        console.log(`🏁 ${method} request completed: ${url}`);
      }
    },
    onSuccess: async (data, variables, context) => {
      try {
        console.log(`🎉 ${method} mutation successful for: ${url}`);

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
              `❌ Error in ${method} onSuccess callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (error) {
        console.error(
          `❌ Error in ${method} onSuccess handler for ${url}:`,
          error
        );
        // Don't throw here - keep the UI stable
      }
    },
    onError: (error, variables, context) => {
      try {
        console.error(`💥 ${method} mutation failed for: ${url}`, {
          error: error.message,
          variables,
        });

        // Call custom onError callback safely
        if (onError) {
          try {
            onError(error, variables);
          } catch (callbackError) {
            console.error(
              `❌ Error in ${method} onError callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (handlerError) {
        console.error(
          `❌ Error in ${method} onError handler for ${url}:`,
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
    // Provide more descriptive mutate functions
    update: mutation.mutate,
    updateAsync: mutation.mutateAsync,
    // Add helper properties for better error handling
    isNetworkError: mutation.error?.message?.includes("Network Error"),
    isServerError: (mutation.error as any)?.status >= 500,
    isClientError:
      (mutation.error as any)?.status >= 400 &&
      (mutation.error as any)?.status < 500,
  };
}

export default useUpdate;
