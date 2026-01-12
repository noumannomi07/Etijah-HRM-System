import { AttendanceItem } from "@/Dashboard/Pages/AttendanceDeparture/types";
import { EAttendanceState, determineAttendanceState } from "@/Dashboard/Pages/AttendanceDeparture/util/determineAttendanceState";
import React from "react";
import { useTranslation } from "react-i18next";

const AttendanceStatusCard = ({ attendance }: { attendance?: AttendanceItem }) => {
  const { t } = useTranslation("staffManagement");

  const attendanceStateMap = {
    [EAttendanceState.WeekDayAbsent]: t("attendance.weekendHoliday"),
    [EAttendanceState.WeekDayPresent]: t("attendance.weekendHoliday"),
    [EAttendanceState.NormalDayAbsent]: t("attendance.absent"),
    [EAttendanceState.NormalDayPresent]: t("attendance.present"),
    [EAttendanceState.VacationDayAbsent]: t("attendance.vacation"),
    [EAttendanceState.VacationDayPresent]: t("attendance.vacation"),
  };

  const attendanceStateColorMap = {
    [EAttendanceState.WeekDayAbsent]: "border-blue-500 bg-blue-200 text-blue-500",
    [EAttendanceState.NormalDayAbsent]: "border-gray-500 bg-gray-200 text-gray-500",
    [EAttendanceState.VacationDayAbsent]: "border-red-500 bg-red-200 text-red-500",
  };

  if (!attendance) {
    return <button className={`btn-no-data ${attendanceStateColorMap[EAttendanceState.NormalDayAbsent]} left-[37%] !right-auto !w-[45%]`}>{t("attendance.noAttendanceData")}</button>;
  }

  const attendanceState = determineAttendanceState(attendance);

  if (
    attendanceState === EAttendanceState.NormalDayPresent ||
    attendanceState === EAttendanceState.VacationDayPresent ||
    attendanceState === EAttendanceState.WeekDayPresent ||
    attendanceState === EAttendanceState.NormalDayAbsent
  ) {
    return <div>
      <div>{attendanceStateMap[attendanceState]}</div>
      {
        attendanceState === EAttendanceState.NormalDayAbsent ?
          <button className={`btn-no-data ${attendanceStateColorMap[EAttendanceState.NormalDayAbsent]} !w-[40%] !left-[10%] !right-auto`}>
            {t("attendance.noAttendanceData")}
          </button>
          : null
      }
    </div>;
  }
  else {
    return <button className={`btn-no-data !w-[60%] !right-[8%] ${attendanceStateColorMap[attendanceState]}`}>
      {attendanceStateMap[attendanceState]}
    </button>;
  }
}

export default AttendanceStatusCard;