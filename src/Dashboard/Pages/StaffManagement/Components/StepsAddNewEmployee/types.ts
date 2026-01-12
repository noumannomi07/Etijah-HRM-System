export type TEmployeeForm = {
  first_name: string;
  last_name: string;
  full_name: string;
  nationality_id: number;
  birth_date: string;

  jobtitle_id: number;
  category_id: number;

  phone: string;
  email: string;

  marital_status: string;
  gender: string

  id_number: string;
  send_invite?: boolean;
  sponsorship?: boolean;
  code?: string;

  contract_type_id: number | null;
  job_type_id: number | null;
  role_id: number | null;
}

export type TWorkdataForm = {
  hire_date?: string;
  trail_end: string;
  role_id?: number;
  manger_id?: number;
  law_country_id?: number;
  worktime_id?: number;
  workplaces?: number[];
   category_id: any,
    jobtitle_id: any,
    contract_type_id: any,
    job_type_id: any,
}

export type TInsuranceForm = {
  category: string;
  medical: number;
  amount: number;
  persons: number;
  number: string;
  start_date: string;
  end_date: string;
  insuranceFile: File | null;
  file?: {
    title: string;
    file: string;
    created_at: string;
    updated_at: string;
  }
}
