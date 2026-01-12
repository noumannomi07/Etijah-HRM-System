export interface VacationRequestFormData {
  employee_id: number;
  start_date: string;
  end_date: string;
  vacation_manage_id: number;
  note?: string;
  file: File | null;
} 