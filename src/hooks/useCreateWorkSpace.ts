import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    async (data: { name: string }) => {
      console.log("🛠️ Mutation triggered with data:", data);
      try {
        const response = await createWorkspace(data.name);
        console.log("✅ Workspace created successfully:", response);
        return response;
      } catch (error) {
        console.error("❌ Error creating workspace:", error);
        throw error;
      }
    },
    "user-workspaces"
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    (data) => {
      console.log("📌 Form submitted with data:", data);
      mutate(data, {
        onSuccess: (response) => {
          console.log("🎉 Mutation successful! Response:", response);
        },
        onError: (error) => {
          console.error("🚨 Mutation failed! Error:", error);
        },
      });
    }
  );

  return { errors, onFormSubmit, register, isPending };
};
