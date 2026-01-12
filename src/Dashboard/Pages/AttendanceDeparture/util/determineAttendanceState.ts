import { AttendanceItem } from "../types";

export enum EAttendanceState {
  WeekDayAbsent = 'WEEK_DAY_ABSENT',
  WeekDayPresent = 'WEEK_DAY_PRESENT',
  NormalDayAbsent = 'NORMAL_DAY_ABSENT',
  NormalDayPresent = 'NORMAL_DAY_PRESENT',
  VacationDayPresent = 'VACATION_DAY_PRESENT',
  VacationDayAbsent = 'VACATION_DAY_ABSENT'
}

export function determineAttendanceState(attendance?: AttendanceItem): EAttendanceState {
  if (!attendance) return EAttendanceState.NormalDayAbsent;
  const isAbsent =  !attendance.attend_time ;
  // const isAbsent = attendance.is_absent === 1 || !attendance.attend_time || attendance.attend_status === 'absent';
  const isVacation = attendance.is_vacation === 1;
  const isWeekVacation = attendance.week_vacation === 1;
  const isVacationAttend = (attendance.attend_time || attendance.leave_time) ? true : false;

  // if (isVacation) {
  //   if (isAbsent) {
  //     return EAttendanceState.VacationDayAbsent;
  //   } else {
  //     return EAttendanceState.VacationDayPresent;
  //   }
  // }

  if(isVacation){
    if(isVacationAttend){
      return EAttendanceState.VacationDayPresent; // normal day attendance with overtime
    } else {
      return EAttendanceState.VacationDayAbsent; // normal vacation
    }
  }

  if (isWeekVacation) {
    // It's a week day (like weekend)
    if (isAbsent) {
      return EAttendanceState.WeekDayAbsent;
    } else {
      return EAttendanceState.WeekDayPresent;
    }
  } else {
    // It's a normal working day
    if (isAbsent) {
      return EAttendanceState.NormalDayAbsent;
    } else {
      return EAttendanceState.NormalDayPresent;
    }
  }
}
