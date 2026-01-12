import React from "react";
import HeaderCardAttendance from "./HeaderCardAttendance";
import TableTabAttendance from "./TableTabAttendance/TableTabAttendance";
import { EmployeeAttendanceProvider } from "./EmployeeAttendanceProvider";

const TabAttendnace = () => {
  return (
    <EmployeeAttendanceProvider>
      <div className="all-tab-audience">
        <HeaderCardAttendance />
        <TableTabAttendance />
      </div>
    </EmployeeAttendanceProvider>
  );
};

export default TabAttendnace;
