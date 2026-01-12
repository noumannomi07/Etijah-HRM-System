import endpoints from "@/api/endpoints";
import { LetterRequest } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface LetterResponse {
  mine: LetterRequest[];
  all: LetterRequest[];
}

const fetchLetters = async () => {
  const response = await axiosInstance.get(endpoints.orders.letters.all);
  return response.data;
};

export const useLetters = (filter: 'mine' | 'all' = 'all') => {
  const query = useQuery<LetterResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["letters", filter],
    queryFn: fetchLetters
  });

  return {
    ...query,
    data: filter === 'mine' ? query?.data?.mine || [] : query?.data?.all || [],
  };
}; 