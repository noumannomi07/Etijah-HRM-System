import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useParams } from 'react-router-dom';

export interface PayrollTransaction {
  id: number;
  payroll_transaction_id: number;
  employee: any; // You can import a more specific type if needed
  status: string;
  month: string;
  year: string;
  salary: string;
  extra: string;
  net_salary: string;
  cut: string;
  bonus: string;
  total: string;
  file: string | null;
  created_at: string;
  updated_at: string;
}

export function useEmployeeTransaction(
  options?: UseQueryOptions<PayrollTransaction[]>
) {
  const { id } = useParams();
  return useQuery<PayrollTransaction[]>({
    queryKey: ['employee-transaction', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(`/transaction/${id}`);
      return data.data;
    },
    ...options,
  });
} 


export function useDownloadPayslip(data) {
  const { id } = useParams();
  return useQuery({
    queryKey: ['employee-transaction', id],
    enabled: !!id,
    queryFn: async () => {
      const { response } = await axios.post('/payroll-pdf', data);
      return response;
    },
  });
}
