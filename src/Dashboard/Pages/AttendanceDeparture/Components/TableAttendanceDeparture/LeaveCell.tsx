import React from "react";
import { useTranslation } from "react-i18next";
import { AttendanceItem } from "../../types";

export default function LeaveCell({ attendance }: { attendance?: AttendanceItem }) {
  const { t } = useTranslation('attendance');
  if (!attendance) return;

  const isLeaveEarly = attendance?.is_early === 1;
  const isLeaveOnTime = attendance?.leave_time;

  if (!attendance?.leave_time) return "-";

  const leaveStatus = `${attendance?.leave_time} ${attendance?.place?.title ? `- ${attendance?.place?.title}` : ''}`;

  const leaveStatusColor =
    isLeaveEarly
      ? 'bg-red-200 text-red-500 rounded-xl px-2 py-1'
      : isLeaveOnTime
        ? 'status-success rounded-xl px-2 py-1'
        : 'bg-blue-200 text-blue-500 rounded-xl px-2 py-1';


  const leaveStatusText =
    isLeaveEarly
      ? t('leave_early')
      : isLeaveOnTime
        ? t('leave_on_time')
        : t('in_work');

  // if (isLeaveEarly) {
  //   return (
  //     <div className="flex flex-col items-center gap-1">
  //       <p className={leaveStatusColor}>
  //         {leaveStatus}
  //       </p>
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-black">
        {leaveStatus}
      </p>
      <div className={leaveStatusColor}>
        {leaveStatusText}
      </div>
    </div>
  );
}