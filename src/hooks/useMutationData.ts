import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess();

      return toast(
        data?.status === 200 || data?.status === 201 ? "Success" : "Error",
        {
          description: data?.data,
        }
      );
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
    },
  });

  return { mutate, isPending };
};

// This custom hook `useMutationDataState` is used to track the state of mutations based on a specific `mutationKey`.
// It uses `useMutationState` from TanStack Query to get the current mutation's `variables` (input data) and `status` (e.g., pending, success, or error).
// The hook filters mutations using the `mutationKey`, selects the relevant data, and returns the most recent mutation's variables and status.
// The `latestVariables` variable will give you the input data and status of the latest mutation for the given `mutationKey`.
// This can be helpful for tracking mutation states or performing optimistic updates without causing unnecessary re-renders.
export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  const latestVariables = data[data.length - 1];
  return { latestVariables };
};
