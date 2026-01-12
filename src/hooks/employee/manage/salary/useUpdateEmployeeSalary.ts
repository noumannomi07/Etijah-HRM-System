import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { EmployeeSalary } from "@/types/Financial";
import { toast } from "react-toastify";

export interface UpdateEmployeeSalaryInput {
  salary: number;
  bank_id: number;
  iban: string;
  account_number: string;
  account_user_name: string;
  payment_method: string;
  salaryextra: {
    id: number;
    amount: number;
  }[];
}

export const useUpdateEmployeeSalary = (id: string, { onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation<EmployeeSalary, Error, UpdateEmployeeSalaryInput>({
    mutationFn: async (data) => {
      const { payment_method, account_user_name, account_number, bank_id, iban, ...rest } = data;
      const payload = payment_method === "bank"
        ? { ...rest, payment_method, iban, account_number, account_user_name, bank_id }
        : { ...rest, payment_method };

      const response = await axiosInstance.post(
        endpoints.employee.manage.salary.update(id),
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-salary", id] });
      toast.success("تم تحديث الراتب بنجاح");
      onSuccess?.();
    },
  });
}; 