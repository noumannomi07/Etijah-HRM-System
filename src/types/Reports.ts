import { Employee } from "@/Dashboard/Pages/types";

export interface MonthlyData {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export interface RequestChart {
  vacation: MonthlyData;
  advance: MonthlyData;
  letter: MonthlyData;
  expenses: MonthlyData;
  ticket: MonthlyData;
  leave: MonthlyData;
}

export interface Report {
  attendances: number;
  tasks: number;
  violations: number;
  rewards: number;
  performance: number;
  jobs: number;
  applicants: number;
  approved_transactions: number;
  rejected_transactions: number;
  employees_count: number;
}

export interface Nationality {
  id: number;
  title: string;
  count: number;
}

export interface Category {
  id: number;
  title: string;
  count: number;
}

export interface Gender {
  title: string;
  count: number;
}

export interface CurrentMonthAttendance {
  month: number;
  total: number;
  late: number;
  early: number;
  overtime: number;
  absent: number;
}

export interface TopViolation {
  id: number;
  count: number;
  title: string;
}

export interface CurrentMonthTaskStatusCount {
  completed: number;
  in_progress: number;
  late: number;
  cancelled: number;
  upcoming: number;
}

export interface EmployeeFileStatus {
  expired: number;
  missing: number;
}

export interface EmployeeFiles {
  "Personal ID": EmployeeFileStatus;
  "Educational Certificates": EmployeeFileStatus;
  "Contracts": EmployeeFileStatus;
  "Passport": EmployeeFileStatus;
}

export interface MonthAttendance {
  first_week: {
    on_time: number;
    late: number;
    absent: number;
    total: number;
  }
  second_week: {
    on_time: number;
    late: number;
    absent: number;
    total: number;
  }
  third_week: {
    on_time: number;
    late: number;
    absent: number;
    total: number;
  }
  fourth_week: {
    on_time: number;
    late: number;
    absent: number;
    total: number;
  }
}


export interface ReportsResponse {
  requestChart: RequestChart;
  report: Report;
  nationalities: Nationality[];
  categories: Category[];
  genders: Gender[];
  getEmployeesBirthdays: Employee[];
  getMonthAttendance: MonthAttendance,
  currentMonthAttendance: CurrentMonthAttendance;
  topViolations: TopViolation[];
  currentMonthTaskStatusCount: CurrentMonthTaskStatusCount;
  employeeFiles: EmployeeFiles;
} 