import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import { useUpdateEmployeeStatus } from "@/hooks/employee/manage/information/useChangeEmployeeStatus";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const StatusSwitch = () => {
  const { employee } = useEmployeeContext();
  const { id } = useParams<{ id?: string }>();
  const [isChecked, setIsChecked] = useState<boolean>(
    Boolean(employee?.status)
  );
  const { mutate: changeEmployeeStatus, isPending } = useUpdateEmployeeStatus({
    onError: () => {
      setIsChecked((prev) => !prev);
    },
  });

  const handleToggle = () => {
    if (id || employee?.id) {
      changeEmployeeStatus({ id: String(employee?.id ?? id) });
      setIsChecked(!isChecked);
    }
  };

  return (
    <label className="flex items-center cursor-pointer justify-center">
      <input
        type="checkbox"
        className="sr-only peer"
        disabled={isPending}
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#32a8405c] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-greenColor01"></div>
    </label>
  );
};

export default StatusSwitch;
