import React from "react";
import { useEmployeeAttendanceContext } from "./EmployeeAttendanceProvider";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import { calculateHoursBetween } from "@/Dashboard/Pages/AttendanceDeparture/util/calculateHoursBetween";
import { useTranslation } from "react-i18next";

const HeaderCardAttendance = () => {
  const { t } = useTranslation("staffManagement");
  const { employee } = useEmployeeContext();
  const { attendance } = useEmployeeAttendanceContext();
  const workingHours =
    employee?.workdata?.worktime?.time_from && employee?.workdata?.worktime?.time_to
      ? calculateHoursBetween(employee?.workdata?.worktime?.time_from, employee?.workdata?.worktime?.time_to)
      : 0;

  const cards = [
    {
      id: 1,
      title: employee?.workdata?.worktime?.time_from ,
      text: t("attendance.workingHours"),
      bgColor: "bg-lightColorWhite",
    },
    {
      id: 2,
      title: attendance?.total_late,
      text: t("attendance.totalLateHours"),
      bgColor: "bg-redLightColor",
    },
    {
      id: 3,
      title: attendance?.total_early_out,
      text: t("attendance.totalEarlyHours"),
      bgColor: "bg-greenLightColor",
    },
    {
      id: 4,
      title: attendance?.total_overtime,
      text: t("attendance.totalOvertimeHours"),
      bgColor: "bg-orangeLightColor",
    },
  ];

  return (
    <div className="header-cards-audience grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card-audience-one card-border ${card.bgColor}`}
        >
          <h2 className="title text-font-dark text-[16px]">{card.title}</h2>
          <p className="text text-font-gray">{card.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HeaderCardAttendance;
