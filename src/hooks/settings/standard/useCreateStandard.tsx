import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Standard } from "./useStandardDetails";

export interface CreateStandardInput {
  "en[title]": string;
  "ar[title]": string;
}

export const useCreateStandard = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Standard, Error, CreateStandardInput>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.settings.standard.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standards"] });
      onSuccess?.();
    },
  });
}; 