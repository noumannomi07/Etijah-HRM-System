// useAttendanceInformation
import React, { createContext, useContext } from "react";
import { useAttendanceInformation, EmployeeAttendance } from "@/hooks/employee/manage/attendance/useAttendanceInformation";
interface EmployeeContextProps {
  attendance?: EmployeeAttendance;
  isPending: boolean;
  error: Error | null;
}

const EmployeeAttendanceContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeAttendanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: attendance, isPending, error } = useAttendanceInformation();

  return (
    <EmployeeAttendanceContext.Provider value={{ attendance, isPending, error }}>
      {children}
    </EmployeeAttendanceContext.Provider>
  );
};

export const useEmployeeAttendanceContext = () => {
  const context = useContext(EmployeeAttendanceContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeAttendanceProvider"
    );
  }
  return context;
};
