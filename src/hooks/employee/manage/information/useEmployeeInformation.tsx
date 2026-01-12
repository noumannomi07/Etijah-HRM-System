import endpoints from "@/api/endpoints";
import { Employee } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const fetchEmployeeInformation = async (id = "") => {
  return axiosInstance
    .get(endpoints.employee.manage.information.show(id))
    .then((res) => {
      return res.data?.data;
    }).catch((err) => {
      console.log(err);
    });
};

export const useEmployeeInformation = (options?: {
  onSucces?: () => void;
  onError?: (e: Error) => void;
}) => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Employee, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-information", id],
    queryFn: () => fetchEmployeeInformation(id),
  });

  useEffect(() => {
    if (query.isSuccess && options?.onSucces) {
      options.onSucces();
    } else if (query.isError && options?.onError) {
      options.onError(query.error);
    }
  }, [query.isSuccess]);

  return {
    ...query,
    data: query?.data,
  };
};
