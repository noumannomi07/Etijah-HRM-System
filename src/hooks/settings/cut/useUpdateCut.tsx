import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Cut } from "./useCutDetails";

interface UpdateCutInput {
  title?: string;
  "en[title]": string;
  "ar[title]": string;
  status?: number;
}

export const useUpdateCut = () => {
  const queryClient = useQueryClient();

  return useMutation<Cut, Error, { id: string; data: UpdateCutInput }>({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.put(endpoints.settings.cut.update(id), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuts"] });
    },
  });
}; 