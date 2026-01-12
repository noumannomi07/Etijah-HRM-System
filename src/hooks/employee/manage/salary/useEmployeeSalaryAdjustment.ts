import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useParams } from 'react-router-dom';

export interface SalaryAdjustment {
  id: number;
  employee_id: number;
  employee_name: string;
  cut_id: number | null;
  cut_title: string | null;
  cut_ar_title: string | null;
  cut_en_title: string | null;
  bonus_id: number | null;
  bonus_title: string | null;
  bonus_ar_title: string | null;
  bonus_en_title: string | null;
  attendance: any;
  violation: any;
  expense: any;
  flight_request: any;
  type: string;
  amount: string;
  reason: string;
  file: string | null;
  created_at: string;
  updated_at: string;
}

export function useEmployeeSalaryAdjustment(
  options?: UseQueryOptions<SalaryAdjustment[]>
) {
  const { id } = useParams();
  return useQuery<SalaryAdjustment[]>({
    queryKey: ['employee-salary-adjustment', id],
    queryFn: async () => {
      const { data } = await axios.get(`/salaryadjustment/${id}`);
      return data?.data;
    },
    ...options,
  });
} 