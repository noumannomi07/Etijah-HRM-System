import { Attendance } from "../AttendanceDeparture/types";
import { Employee } from "../types";


interface Task {
  id: number;
  title: string;
  content: string;
  status: 'upcoming' | string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  priority: 'low' | 'high' | 'medium';
  employees: Employee[];
}

interface WeekAttendance {
  on_time: number;
  late: number;
  absent: number;
  total: number;
}

interface MonthAttendance {
  first_week: WeekAttendance;
  second_week: WeekAttendance;
  third_week: WeekAttendance;
  fourth_week: WeekAttendance;
}

interface BlogImage {
  id: number;
  image: string;
}

interface Blog {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  content: string;
  ar_content: string;
  en_content: string;
  images: BlogImage[];
}

export interface HomePageData {
  all_employees: number;
  all_violations: number;
  all_tasks: number;
  all_vacations: number;
  today_tasks: Task[];
  month_attendance: MonthAttendance;
  today_attendance: Attendance[];
  latest_blogs: Blog[];
}