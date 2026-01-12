import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from '@/utils/axios';
import type { SalaryAdjustment } from './useEmployeeSalaryAdjustment';
import { Bank } from '@/hooks/settings/bank';
import { Employee } from '@/types/Financial';
import { Allowance } from '@/hooks/settings/allowance';
import { JobTitle } from '@/Dashboard/Pages/types';
import { useParams } from 'react-router-dom';
import endpoints from '@/api/endpoints';

export interface TSalaryExtra {
  id: number;
  allowance: Allowance;
  amount: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface TPayrollSalary {
  id: number;
  employee: Employee;
  salary: number;
  salaryextra: TSalaryExtra[];
  payment_method: string;
  iban: string;
  account_number: string;
  account_user_name: string;
  bank: Bank;
  extra_total: number;
  net_salary: number;
  created_at: string;
  updated_at: string;
}

export interface TPayroll {
  id: number;
  id_number: string;
  jobtitle: JobTitle;
  name: string;
  image: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  phone: string;
  email: string;
  sponsorship: number;
  status: number;
  created_at: string;
  updated_at: string;
  code: string;
  bonuses: SalaryAdjustment[];
  cuts: SalaryAdjustment[];
  salary_adjustments: SalaryAdjustment[];
  salaryextras: TSalaryExtra[];
  salary: TPayrollSalary;
  total_bonus: number;
  total_cut: number;
  month_salary: number;
  check_transaction: boolean;
}

export function useEmployeePayroll(
  options?: UseQueryOptions<TPayroll>
) {
  const { id } = useParams();
  const emId = options?.id || id;
  return useQuery<TPayroll>({
    queryKey: ['employee-payroll', emId],
    enabled: !!emId,
    queryFn: async () => {
      const { data } = await axios.get(endpoints.employee.manage.salary.payroll(emId));
      return data.data;
    },
    ...options,
  });
} 