import React, { createContext, useContext } from "react";
import { useWorkdataInformation } from "@/hooks/employee/manage/workdata/useWorkdataInformation";
import { Workdata } from "@/Dashboard/Pages/types";

interface EmployeeContextProps {
  workdata?: Workdata;
  isPending: boolean;
  error: Error | null;
}

const WorkdataContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const WorkdataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: workdata, isPending, error } = useWorkdataInformation();

  return (
    <WorkdataContext.Provider value={{ workdata, isPending, error }}>
      {children}
    </WorkdataContext.Provider>
  );
};

export const useWorkdataContext = () => {
  const context = useContext(WorkdataContext);
  if (context === undefined) {
    throw new Error(
      "useWorkdataContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
