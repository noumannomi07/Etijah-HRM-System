import endpoints from "@/api/endpoints";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const fetchHomeData = async (date: string | null) => {
  return await axiosInstance
    .get<HomePageData>(endpoints.home, { params: { date } })
    .then((res) => {
      return res.data;
    });
};

export const useHomeData = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");

  return useQuery({
    staleTime: 15 * 60 * 1000,
    queryKey: ["home-data", date],
    queryFn: () => fetchHomeData(date),
  });
};
