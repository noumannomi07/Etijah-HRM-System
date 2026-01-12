import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { convertObjectValuesToString } from "@/utils/payload";
import { Letter } from "@/Dashboard/Pages/types";
import { LetterRequestFormData } from "@/Dashboard/Pages/Orders/types/Letter";

const updateLetter = async (id: string, letterData: LetterRequestFormData) => {
  const formData = convertObjectValuesToString(letterData);

  return axiosInstance
    .put<ApiResponse<Letter>>(
      endpoints.orders.letters.update(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

type UpdateLetterOptions = UseMutationOptions<
  Letter, Error, { id: string; letterData: LetterRequestFormData }, unknown
>;

export const useUpdateLetter = (options?: UpdateLetterOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, letterData }: { id: string; letterData: LetterRequestFormData }) =>
      updateLetter(id, letterData),
    onSuccess: (_, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["letter-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      options?.onSuccess?.(_, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Error updating letter:", error);
      options?.onError?.(error, variables, context);
    },
  });
}; 