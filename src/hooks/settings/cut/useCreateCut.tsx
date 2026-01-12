import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Cut } from "./useCutDetails";

export interface CreateCutInput {
  title?: string;
  "en[title]": string;
  "ar[title]": string;
  status?: number;
}

export const useCreateCut = () => {
  const queryClient = useQueryClient();

  return useMutation<Cut, Error, CreateCutInput>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.settings.cut.create, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuts"] });
    },
  });
}; 