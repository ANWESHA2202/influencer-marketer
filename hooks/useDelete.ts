import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";

interface UseDeleteOptions<TData = any, TVariables = any>
  extends Omit<
    UseMutationOptions<AxiosResponse<TData>, Error, TVariables>,
    "mutationFn"
  > {
  onSuccess?: (data: AxiosResponse<TData>, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  invalidateQueries?: string[];
}

export function useDelete<TData = any, TVariables = any>(
  axiosInstance: AxiosInstance,
  url: string,
  headerType: "withHeaders" | "withoutHeaders" = "withHeaders",
  options: UseDeleteOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  const {
    onSuccess,
    onError,
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  const mutation = useMutation({
    mutationFn: async (
      variables: TVariables
    ): Promise<AxiosResponse<TData>> => {
      try {
        // Handle URL parameter replacement and ID extraction
        let finalUrl = url;
        let deleteId: string | number | undefined;

        if (typeof variables === "object" && variables && "id" in variables) {
          deleteId = (variables as any).id;
          finalUrl = url.replace(":id", String(deleteId));
        } else if (
          typeof variables === "string" ||
          typeof variables === "number"
        ) {
          deleteId = variables;
          finalUrl = url.replace(":id", String(variables));
        }

        const config =
          headerType === "withoutHeaders" ? { headers: {} } : undefined;

        const response = await axiosInstance.delete<TData>(finalUrl, config);

        return response;
      } catch (error: any) {
        console.error(`❌ DELETE request failed: ${url}`, {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          variables,
        });

        // Create a safe error with better messaging
        const safeError = new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to delete resource"
        );

        // Add additional error context
        (safeError as any).status = error.response?.status;
        (safeError as any).statusText = error.response?.statusText;
        (safeError as any).originalError = error;

        throw safeError;
      }
    },
    onSuccess: async (data, variables, context) => {
      try {
        // Invalidate related queries safely
        if (invalidateQueries.length > 0) {
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
              `❌ Error in DELETE onSuccess callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (error) {
        console.error(
          `❌ Error in DELETE onSuccess handler for ${url}:`,
          error
        );
        // Don't throw here - keep the UI stable
      }
    },
    onError: (error, variables, context) => {
      try {
        console.error(`💥 DELETE mutation failed for: ${url}`, {
          error: error.message,
          variables,
        });

        // Call custom onError callback safely
        if (onError) {
          try {
            onError(error, variables);
          } catch (callbackError) {
            console.error(
              `❌ Error in DELETE onError callback for ${url}:`,
              callbackError
            );
            // Don't throw here - callback errors shouldn't break the mutation
          }
        }
      } catch (handlerError) {
        console.error(
          `❌ Error in DELETE onError handler for ${url}:`,
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
    delete: mutation.mutate,
    deleteAsync: mutation.mutateAsync,
    // Add helper properties for better error handling
    isNetworkError: mutation.error?.message?.includes("Network Error"),
    isServerError: (mutation.error as any)?.status >= 500,
    isClientError:
      (mutation.error as any)?.status >= 400 &&
      (mutation.error as any)?.status < 500,
  };
}

export default useDelete;
