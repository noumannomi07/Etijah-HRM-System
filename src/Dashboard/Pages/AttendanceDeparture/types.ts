import { EStatus, Place, Workdata, Worktime } from "../types";

export type AttendanceItem = {
  id: number;
  employee_id: number;
  worktime_id: number;
  place_id: number | null;
  place: Place | null;
  date: string;
  break: string;
  flexible: number;
  flexible_time: number;
  absent_after: number;
  is_absent: number | null;
  attend_time: string;
  attend_status: 'present' | 'late' | 'absent';
  attend_late: string;
  attend_lat: number | null;
  attend_lng: number | null;
  attend_address: string | null;
  attend_image: string | null;
  leave_time: string | null;
  leave_status: string | null;
  leave_early: number;
  leave_lat: number | null;
  leave_lng: number | null;
  leave_address: string | null;
  leave_image: string | null;
  leave_reason: string | null;
  is_vacation: number;
  created_at: string;
  updated_at: string;
  late_time: string | null,  // وقت التاخير في الحضور
  late_fine: string | null, // غرامة التاخير
  is_late: number, // اتاخر ولا لا
  late_fine_approved: EStatus,  // اتصخم منه ولا لا 
  early_time: string | null, // الوقت الي مشيه بدري
  early_fine: string | null,// غرامة المشيان
  is_early: number, // مشي بدري ولا لا
  vacation_id: number | null, // رقم طلب الاجازة
  week_vacation: number, //  الاجازة الاسبوعية
  ar_message: string | null,
  en_message: string | null,
  overtime: string | null,
  is_overtime: number, // قعد اوفر تايم ولا
  overtime_approved: EStatus,
  overtime_extra: string | null,
  early_fine_approved: EStatus,
};

export interface Attendance {
  id: number;
  code: string | null;
  name: string;
  image: string;
  jobtitle?: string;
  workdata: Workdata;
  attendance: AttendanceItem[];
}


export interface AttendOrLeave {
  id: number;
  code: string;
  name: string;
  image: string;
  jobtitle?: string
  worktime?: Worktime;
  workplaces: Place[];
  attendance?: AttendanceItem;
}