import { EStatus } from "../../types";

export interface AdvanceStatusFormData {
  advance_id: number;
  status: EStatus;
}

export interface AdvanceFormData {
  employee_id: number;
  start_date: string;
  advance_manage_id: number;
  amount: number;
  note: string;
  file: File | null;
} 