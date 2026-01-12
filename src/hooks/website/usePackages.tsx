import endpoints from "@/api/endpoints";
import { PackagesResponse } from "@/types/packages";
import { axiosWebsiteInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchPackages = async () => {
  return await axiosWebsiteInstance
    .get<PackagesResponse>(endpoints.website.packages)
    .then((res) => {
      return res.data;
    });
};

export const usePackages = () => {
  const query = useQuery<PackagesResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["website-packages"],
    queryFn: fetchPackages,
  });

  return {
    ...query,
    data: query?.data,
  };
};
