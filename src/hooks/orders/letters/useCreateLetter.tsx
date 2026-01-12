import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";
import { Letter } from "@/Dashboard/Pages/types";
import { LetterRequestFormData } from "@/Dashboard/Pages/Orders/types/Letter";

const createLetter = async (letterData: LetterRequestFormData) => {
  const formData = convertObjectValuesToString(letterData);

  return axiosInstance
    .post<ApiResponse<Letter>>(
      endpoints.orders.letters.create,
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

export const useCreateLetter = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      navigate(FullRoutes.Dashboard.Orders[CommonRouteKeys.All]);
    },
    onError: (error) => {
      console.error("Error creating letter:", error);
    },
  });
}; 