import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Standard } from "./useStandardDetails";
import { convertObjectValuesToString } from "@/utils/payload";
export interface UpdateStandardInput {
  "en[title]": string;
  "ar[title]": string;
}

export const useUpdateStandard = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Standard, Error, { id: string; data: UpdateStandardInput }>({
    mutationFn: async ({ id, data }) => {
      const formattedPayload = convertObjectValuesToString(data);
      return await axiosInstance.put(
        endpoints.settings.standard.update(id),
        formattedPayload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standards"] });
      onSuccess?.();
    },
  });
}; 