import React from "react";
import { AttendanceItem } from "../types";
import {
    determineAttendanceState,
    EAttendanceState,
} from "../util/determineAttendanceState";

const attendanceStateMap = {
    [EAttendanceState.WeekDayAbsent]: "عطلة نهاية الاسبوع",
    [EAttendanceState.WeekDayPresent]: "عطلة نهاية الاسبوع",
    [EAttendanceState.NormalDayAbsent]: "غياب",
    [EAttendanceState.NormalDayPresent]: "حضور",
    [EAttendanceState.VacationDayAbsent]: "اجازة",
    [EAttendanceState.VacationDayPresent]: "اجازة",
};

const attendanceStateColorMap = {
    [EAttendanceState.WeekDayAbsent]:
        "border-blue-500 bg-blue-200 text-blue-500",
    [EAttendanceState.NormalDayAbsent]:
        "border-gray-500 bg-gray-200 text-gray-500",
    [EAttendanceState.VacationDayAbsent]:
        "border-red-500 bg-red-200 text-red-500",
};

export default function AttendanceStatusCard({
    attendance,
    fromHome = false,
}: {
    attendance?: AttendanceItem;
    fromHome?: boolean;
}) {
    if (!attendance) {
        return (
            <button
                className={`btn-no-data ${
                    attendanceStateColorMap[EAttendanceState.NormalDayAbsent]
                } left-[37%] !right-auto !w-[45%]`}
            >
                {fromHome ? "-" : "لا يوجد بيانات عمل للموظف"}
            </button>
        );
    }
    const attendanceState = determineAttendanceState(attendance);

    if (
        attendanceState === EAttendanceState.NormalDayPresent ||
        attendanceState === EAttendanceState.VacationDayPresent ||
        attendanceState === EAttendanceState.WeekDayPresent ||
        attendanceState === EAttendanceState.NormalDayAbsent
    ) {
        return (
            <div>
                <div>{attendanceStateMap[attendanceState]}</div>
                {attendanceState === EAttendanceState.NormalDayAbsent && !fromHome ? (
                    <button
                        className={`btn-no-data ${
                            attendanceStateColorMap[
                                EAttendanceState.NormalDayAbsent
                            ]
                        } !w-[40%] !left-[32%] !right-auto`}
                    >
                        لا يوجد بيانات حضور للموظف
                    </button>
                ) : null}
            </div>
        );
    } else {
        return (
            <button
                className={`btn-no-data !w-[43%] ${attendanceStateColorMap[attendanceState]}`}
            >
                {attendanceStateMap[attendanceState]}
            </button>
        );
    }
}
