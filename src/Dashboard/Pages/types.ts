export enum EStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Paid = "paid",
}

export interface Place {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  address: string;
  lat: string | null;
  lng: string | null;
  round: number;
  created_at: string;
}

export interface Translation {
  id: number;
  worktime_id: number;
  locale: string;
  title: string;
}

export interface Worktime {
  id: number;
  time_from: string;
  time_to: string;
  period: string;
  vacation_days: EVacationDay[];
  status: number;
  flexible: number;
  place: Place[];
  flexible_time: number;
  break: number;
  absent_after: number;
  created_at: string;
  updated_at: string;
  title: string;
  translations: Translation[];
}

export interface LawCountry {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface File {
  title: string,
  file: string,
  created_at: string,
  updated_at: string
}

export interface Manager {
  id: number;
  id_number: string | null;
  jobtitle: string | null;
  name: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  gender: string;
  phone: string;
  email: string;
  sponsorship: number;
  status: number;
  created_at: string;
  updated_at: string;
  code: string | null;
}

export enum EVacationDay {
  Sunday = "0",
  Monday = "1",
  Tuesday = "2",
  Wednesday = "3",
  Thursday = "4",
  Friday = "5",
  Saturday = "6",
}

export type WorkTime = {
  id: number;
  title: string;
  en_title: string;
  ar_title: string;
  time_from: string;
  time_to: string;
  period: string;
  vacation_days: EVacationDay[];
  flexible: number;
  flexible_time: number;
  break: number;
  absent_after: number;
  created_at: string;
};

export interface Role {
  id: number;
  title: string;
  status: number;
  employees_count: number;
  created_at: string;
  updated_at: string;
}

export interface Workdata {
  id: number;
  employee_id: number;
  role?: Role;
  hire_date: string | null;
  trail_end: string | null;
  law_country: LawCountry;
  manger: Manager;
  worktime: WorkTime;
  created_at: string;
  updated_at: string;
  places: Array<Place>;
}

export interface Nationality {
  id: number;
  title: string;
  status: number;
  employees_count: number;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  amount: number,
  title: string,
  adult: number;
  child: number;
  infant: number;
  used_this_year: boolean;
  created_at: string;
  updated_at: string;
}

export interface ViolationRule {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  first_type?: string;
  second_type?: string;
  third_type?: string;
  fourth_type?: string;
  fifth_type?: string;
  first_value?: string;
  second_value?: string;
  third_value?: string;
  fourth_value?: string;
  fifth_value?: string;
}

export interface Violation {
  id: number;
  employee: Employee;
  violation_rule: ViolationRule;
  type: string;
  value: string;
  times: string;
  note?: string;
  apply_action: number;
  date: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface Insurance {
  id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
  coverage_amount: number | null;
  created_at: string;
  updated_at: string;
  category: string;
  number: string;
  persons: number;
  amount: number | null;
  file: File;
  medical: number;
}

export interface Asset {
  id: number;
  employee_id: number;
  title: string;
  content: string;
  deliver_date: string;
  status: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryId {
  id: number;
  title: string;
  status: number;
  employees_count: number;
  created_at: string;
}

export interface JobTitle {
  id: number;
  title: string;
  status: number;
  employees_count: number;
  created_at: string;
}
export interface Employee {
  id: number;
  idtype?: string;
  id_number?: string;
  category_id?: CategoryId;
  jobtitle?: JobTitle;
  nationality?: Nationality;
  first_name: string;
  last_name: string;
  full_name: string;
  birth_date?: string;
  gender: string;
  marital_status: string;
  phone: string;
  email: string;
  sponsorship: number;
  status: number;
  code?: string | null;
  created_at: string;
  updated_at: string;
  files: any[];
  assets: Asset[];
  salaries?: any | null;
  tickets?: Ticket;
  workdata: Workdata;
  insurance?: Insurance;
  name?: string;
  image?: string;
  contracttype?: ContractType;
  jobtype?: JobType;
}

export type ContractType = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  status: number;
  created_at: string;
}

export type JobType = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  status: number;
  created_at: string;
}

export type VacationType = {
  id: number;
  title: string;
  content: string;
  ar_title: string;
  en_title: string;
  ar_content: string;
  en_content: string;
  days: number;
  paid: number;
  paid_percent: number;
  can_take_after: number;
  status: number;
  created_at: string;
  days_calculated?: DaysCalculated
}

export type DaysCalculated = {
  real_days: number;
  taken_days: number;
  left_days: number;
}

export interface VacationEntry {
  id: number;
  employee: Employee;
  start_date: string;
  end_date: string;
  status: EStatus;
  paid: number;
  days: number;
  paid_percent: number;
  can_take_after: number;
  note: string;
  file?: string;
  created_at: string;
  updated_at: string;
  vacation_manage_id: number;
  vacation_type: VacationType;
  days_calculated: DaysCalculated;
  
}

export interface VacationData {
  types: Array<VacationType>;
  vacations: VacationEntry[];
}

type ManagerAdvance = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  days: number | null;
  status: number;
  created_at: string;
}

export interface Advance {
  id: number;
  status: EStatus;
  advance_manage: ManagerAdvance;
  employee: Employee;
  start_date: string;
  end_date: string;
  days: number | null;
  amount: string;
  file: string;
  note: string;
  created_at: string;
}

type Person = {
  id: number;
  flight_request_id: number;
  type: string;
  first_name: string;
  last_name: string;
  gender: string;
  passport_number: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
}

export interface AirlineTicket {
  id: number;
  employee: Employee;
  ticket: Ticket | null;
  reference_number: string;
  request_type: string;
  date: string;
  price: string;
  file: string;
  content: string;
  has_tax: number;
  tax: number;
  created_at: string;
  updated_at: string;
  people: Array<Person>;
  flight_type: string;
  from: string;
  to: string;
  leave_date: string;
  return_date: string | null;
  notes: string | null;
  phone: string;
  email: string;
}

export type ExpenseManage = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  status: number;
  has_mile: number;
  created_at: string;
}

export type Expense = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  status: number;
  created_at: string;
}

export interface ExpenseRequest {
  id: number;
  code: string | null;
  employee: Employee;
  expense_mangment_id: Expense;
  project_management_id: number | null;
  content: string;
  amount: string;
  date: string;
  has_tax: number;
  tax: string;
  image: string | null;
  has_mile: number;
  mile_price: number;
  mile_type: string;
  miles: number;
  km_from: number;
  km_to: number;
  start_lat: string;
  start_lng: string;
  end_lat: string;
  end_lng: string;
  created_at: string;
  updated_at: string;
}

export type Letter = {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  image: string;
  status: number;
  all_nationality: number;
  nationalities: Array<Nationality>;
  created_at: string;
}


export interface LetterRequest {
  id: number;
  letter_mangment: Letter;
  employee: Employee;
  note: string;
  directed_to: string;
  file: string | null;
  created_at: string;
  updated_at: string;
  status: string;
}

export type Project = {
  id: number;
  title: string;
  status: number;
  created_at: string;
}

export type TaskType = {
  id: number;
  title: string;
  content: string | null;
  status: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  priority: string;
  employees: Array<Employee>;
};
export interface TasksData {
  upcoming_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;
  cancelled_tasks: number;
  late_tasks: number;
  all_tasks: TaskType[];
  my_tasks: TaskType[];
}

export interface FileCategory {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  is_required: number;
  is_multiple: number;
  end_notify: number;
  notify_months: number;
  status: number;
  created_at: string;
}

export interface EmployeeFile {
  id: number;
  title: string;
  expire_date: string;
  file: string;
  code: string;
  type: string;
  size: string;
  extension: string;
  created_at: string;
  updated_at: string;
  category: FileCategory;
}

export interface Role {
  id: number;
  name: string;
  display_name: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttendanceEdit {
  id: number;
  employee: Employee;
  date: string;
  type: "Early" | "Late" | "Absent" | "Overtime";
  fine: string | number;
  fine_type: "minus" | "plus";
  time: string | number | "Day" | null;
}

export interface AttendanceDataResponse {
  pending: AttendanceEdit[];
  approved: AttendanceEdit[];
  rejected: AttendanceEdit[];
}

export interface PayrollTransaction {
  id: number;
  admin: Employee;
  month: string;
  year: string;
  salary: string;
  cut: string;
  bonus: string;
  extra: string;
  total: string;
  status: "pending" | "approved" | "rejected" | "paid";
  comment: string | null;
  approved_by: number | null;
  approved_at: string | null;
  approved_comment: string | null;
  rejected_by: number | null;
  rejected_at: string | null;
  rejected_comment: string | null;
  employees_count: number;
  comments: PayrollTransactionComment[];
  employees: Array<PayrollTransactionEmployeeDetails>;
  created_at: string;
  updated_at: string;
}

export interface PayrollTransactionEmployeeDetails {
  id: number;
  payroll_transaction_id: number;
  employee: Employee;
  salary: string;
  cut: string;
  bonus: string;
  extra: string;
  net_salary: string;
  total: string;
  file: string | null;
  created_at: string;
  updated_at: string;
}

export interface PayrollTransactionComment {
  id: number;
  comment: string;
  employee: Employee;
  created_at: string;
}