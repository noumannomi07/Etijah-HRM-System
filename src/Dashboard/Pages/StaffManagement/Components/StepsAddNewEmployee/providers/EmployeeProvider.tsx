import React, { createContext, useContext } from "react";
import { Employee } from "../../../types";
import { useEmployeeInformation } from "@/hooks/employee/manage/information/useEmployeeInformation";
import { useTranslation } from "react-i18next";

interface EmployeeContextProps {
  employee?: Employee;
  isPending: boolean;
  error: Error | null;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: employee, isPending, error } = useEmployeeInformation();

  return (
    <EmployeeContext.Provider value={{ employee, isPending, error }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const { t } = useTranslation("staffManagement");
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      t("messages.employeeContextError", "useEmployeeContext must be used within an EmployeeProvider")
    );
  }
  return context;
};
