import { Employee } from "@/Dashboard/Pages/types";

export interface ApprovalEmployee {
  id: number;
  employee: Employee;
  type: 'vacation' | 'leave' | 'ticket' | 'expense' | 'letter' | 'advance';
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApprovalSettings {
  id: number;
  vacation_approve: boolean;
  leave_approve: boolean;
  ticket_approve: boolean;
  expense_approve: boolean;
  letter_approve: boolean;
  advance_approve: boolean;
  vacation: string;
  leave: string;
  vacation_hr: ApprovalEmployee[];
  leave_hr: ApprovalEmployee[];
  ticket_hr: ApprovalEmployee[];
  expense_hr: ApprovalEmployee[];
  letter_hr: ApprovalEmployee[];
  advance_hr: ApprovalEmployee[];
  created_at: string;
  updated_at: string;
}