import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Allowance } from "./useAllowanceDetails";
import { CreateAllowanceInput } from "./useCreateAllowance";

interface UpdateAllowanceVariables {
  id: string;
  data: CreateAllowanceInput;
}

export const useUpdateAllowance = () => {
  const queryClient = useQueryClient();

  return useMutation<Allowance, Error, UpdateAllowanceVariables>({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.put(
        endpoints.settings.allowance_mangments.update(id),
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowances"] });
    },
  });
}; 