import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import React from "react";
import PendingEdits from "./Components/PendingEdits";
import AcceptedEdits from "./Components/AcceptedEdits";
import RejectedEdits from "./Components/RejectedEdits";
import "./AttendanceDepartureEdits.css";
import { useAttendanceData } from "@/hooks/attendance/useAttendanceData";
import { useSearchParams } from "react-router-dom";
import HelmetInfo from "@/components/HelmetInfo/HelmetInfo";
import { withPermissions } from "@/hoc";

const AttendanceDepartureEdits = () => {
  const { data: attendanceData, isPending } = useAttendanceData();
  const [, setSearchParams] = useSearchParams();

  const tabsData = [
    {
      label: "التعديلات المعلقه",
      content: <PendingEdits data={attendanceData?.pending || []} isPending={isPending} />
    },
    {
      label: "التعديلات المقبولة",
      content: <AcceptedEdits data={attendanceData?.approved || []} isPending={isPending} />
    },
    {
      label: "التعديلات المرفوضة",
      content: <RejectedEdits data={attendanceData?.rejected || []} isPending={isPending} />
    }
  ];

  const onChangeTab = () => {
    setSearchParams();
  };

  return (
    <div className="attendance-departure-edits">
      <HelmetInfo titlePage={"تعديلات الحضور و الانصراف"} />
      <HorizontalTabs
        newClassName=""
        isBgTabButton={true}
        tabsData={tabsData}
        onChangeTab={onChangeTab}
      />
    </div>
  );
};

export default withPermissions(AttendanceDepartureEdits, "attendance");



