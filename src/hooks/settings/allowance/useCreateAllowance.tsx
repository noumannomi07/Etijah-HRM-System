import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Allowance } from "./useAllowanceDetails";

export interface CreateAllowanceInput {
  "en[title]": string;
  "ar[title]": string;
  status?: number;
}

export const useCreateAllowance = () => {
  const queryClient = useQueryClient();

  return useMutation<Allowance, Error, CreateAllowanceInput>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.settings.allowance_mangments.create, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowances"] });
    },
  });
}; 