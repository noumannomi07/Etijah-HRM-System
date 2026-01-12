import React, { useMemo, useState, useEffect } from "react";
import male from "@assets/images/homeimages/users/male.png";
import { useTranslation } from "react-i18next";
import { Loading } from "@/components";
import { useEmployeeSelect } from "@/hooks/employee/mini-for-select/useEmployeeForSelect";
import { useOvertimeManagement } from "@/hooks/api";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
  name?: string;
}

const TabOvertimeManagment = ({ permissions }: { permissions: any }) => {
  const { t } = useTranslation("staffManagement");
  const { data: employeeData, isLoading: isEmployeeLoading } =
    useEmployeeSelect();
  const { queryAll, isCreating } = useOvertimeManagement();

  const [includedEmployees, setIncludedEmployees] = useState<Employee[]>([]);
  const [isOptimisticUpdate, setIsOptimisticUpdate] = useState(false);

  useEffect(() => {
    if (queryAll.data) {
      setIncludedEmployees(
        queryAll.data.map((emp: any) => ({
          ...emp,
          first_name: emp?.employee?.first_name,
          last_name: emp?.employee?.last_name,
          name: `${emp?.employee?.first_name} ${emp?.employee?.last_name}`,
          image: emp?.employee?.image,
          id: emp?.employee?.id
        }))
      );
    }
  }, [queryAll.data]);

  //   THIS FUNCTION FOR ADD EMPLOYEE
  const handleInclude = async (user: Employee) => {
    try {
      setIsOptimisticUpdate(true);
      setIncludedEmployees((prev) => [...prev, user]);

      const formData = new FormData();
      formData.append("employee_id", user.id.toString());

      const response = await axiosInstance.post(
        "/overtime-add-employee",
        formData
      );

      if (response.data?.success === false) {
        throw new Error(response.data?.message || "فشل في إضافة الموظف.");
      }

      await queryAll.refetch();
    } catch (error: any) {
      setIncludedEmployees((prev) => prev.filter((emp) => emp.id !== user.id));
      console.error("خطأ في تضمين الموظف:", error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("حدث خطأ أثناء تضمين الموظف.");
      }
    } finally {
      setIsOptimisticUpdate(false);
    }
  };

  //   THIS FUNCTION FOR REMOVE EMPLOYEE
  const handleExclude = async (user: Employee) => {
    // CHECK IF EMPLOYEE IS HAVE ID AND EXISTS  BEFORE REMOVE
    if (!includedEmployees.some((emp) => emp.id === user.id)) {
      return;
    }

    try {
      setIsOptimisticUpdate(true);
      setIncludedEmployees((prev) => prev.filter((emp) => emp.id !== user.id));

      const formData = new FormData();
      formData.append("employee_id", user.id.toString());

      const response = await axiosInstance.post(
        "/overtime-remove-employee",
        formData
      );
      if (
        response.data?.success === false &&
        response.data?.message !== "Employee not found"
      ) {
        throw new Error(response.data?.message || "Failed to remove employee.");
      }

      await queryAll.refetch();
    } catch (error: any) {
      setIncludedEmployees((prev) => [...prev, user]);
      console.error("Error excluding employee:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while excluding the employee.";
      if (errorMessage !== "Employee not found") {
        toast.error(errorMessage);
      }
    } finally {
      setIsOptimisticUpdate(false);
    }
  };

  //   THIS FUNCTION FOR ADD ALL EMPLOYEES
  const addAll = async () => {
    const previousState = [...includedEmployees];
    try {
      setIsOptimisticUpdate(true);
      const allEmployees = employeeData ?? [];
      setIncludedEmployees(allEmployees);

      const formData = new FormData();
      allEmployees.forEach((emp, index) => {
        formData.append(`employees_id[${index}]`, emp.id.toString());
      });

      const response = await axiosInstance.post("/overtime-add-all", formData);

      if (response.data?.success === false) {
        throw new Error(response.data?.message || "فشل في إضافة الكل.");
      }

      await queryAll.refetch();
    } catch (error: any) {
      setIncludedEmployees(previousState);
      console.error("خطأ في إضافة الكل:", error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("حدث خطأ أثناء إضافة جميع الموظفين.");
      }
    } finally {
      setIsOptimisticUpdate(false);
    }
  };

  //   THIS FUNCTION FOR REMOVE ALL EMPLOYEE
  const removeAll = async () => {
    const previousState = [...includedEmployees];
    try {
      setIsOptimisticUpdate(true);
      setIncludedEmployees([]);

      const response = await axiosInstance.post("/overtime-remove-all");

      if (response.data?.success === false) {
        throw new Error(response.data?.message || "فشل في حذف الكل.");
      }

      await queryAll.refetch();
    } catch (error: any) {
      setIncludedEmployees(previousState);
      console.error("خطأ في حذف الكل:", error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("حدث خطأ أثناء إزالة جميع الموظفين.");
      }
    } finally {
      setIsOptimisticUpdate(false);
    }
  };

  const excluded = useMemo(() => {
    const includedIds = includedEmployees.map((emp) => emp.id);
    return employeeData?.filter((user) => !includedIds.includes(user.id));
  }, [employeeData, includedEmployees]);

  if (queryAll.isLoading || isEmployeeLoading) return <Loading />;

  return (
    <div className="flex gap-6 p-4 bg-gray-50 rounded-lg">
      {/* الموظفون المستبعدون */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 min-h-[400px] transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <span className="text-gray-600 font-medium">
            {t("excludedEmployees")} {excluded?.length ?? 0}
          </span>
          <button
            onClick={addAll}
            className="text-purple-600 hover:text-purple-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded-md hover:bg-purple-50"
            disabled={
              isCreating ||
              isOptimisticUpdate ||
              !excluded?.length ||
              !permissions?.update
            }
          >
            {t("moveAll")}
          </button>
        </div>
        <ul className="divide-y divide-gray-100">
          {excluded?.map((user) => (
            <li
              key={user.id}
              onClick={() => handleInclude(user)}
              className="flex items-center cursor-pointer flex-row-reverse justify-between py-3 px-2 mb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md"
            >
              <button
                className="text-green-500 hover:text-green-700 transition-colors duration-200 text-xl p-1 rounded-full hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isCreating || isOptimisticUpdate || !permissions?.update
                }
              >
                <span className="block rtl:rotate-[180deg]">&lt;&lt;</span>
              </button>
              <div className="flex items-center flex-row-reverse gap-3">
                <span className="text-gray-700">{user?.name}</span>
                <img
                  src={user?.image || male}
                  alt="avatar"
                  className="rounded-full w-10 h-10 border-2 border-green-100 object-cover"
                />
              </div>
            </li>
          ))}
          {!excluded?.length && (
            <li className="text-center py-8 text-gray-500">
              {t("noExcludedEmployees")}
            </li>
          )}
        </ul>
        {(isCreating || isOptimisticUpdate) && (
          <div className="flex justify-center items-center h-full mt-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* الموظفون المشمولون */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 min-h-[400px] transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center flex-row-reverse mb-4 border-b pb-3">
          <button
            onClick={removeAll}
            className="text-purple-600 hover:text-purple-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded-md hover:bg-purple-50"
            disabled={
              isCreating ||
              isOptimisticUpdate ||
              includedEmployees.length === 0 ||
              !permissions?.update
            }
          >
            {t("deleteAll")}
          </button>
          <span className="text-gray-600 font-medium">
            {t("includeEmployees")} {includedEmployees.length}
          </span>
        </div>
        <ul className="divide-y divide-gray-100">
          {includedEmployees.map((user) => (
            <li
              key={user.id}
              className="flex items-center cursor-pointer justify-between py-3 px-2 hover:bg-gray-50 transition-colors duration-200 rounded-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.image || male}
                  alt="avatar"
                  className="rounded-full w-10 h-10 border-2 border-purple-100 object-cover"
                />
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={() => handleExclude(user)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 text-xl p-1 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isCreating || isOptimisticUpdate || !permissions?.update
                }
              >
                ×
              </button>
            </li>
          ))}
          {includedEmployees.length === 0 && (
            <li className="text-center py-8 text-gray-500">
              {t("noIncludedEmployees")}
            </li>
          )}
        </ul>
        {(isCreating || isOptimisticUpdate) && (
          <div className="flex justify-center items-center h-full mt-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabOvertimeManagment;
