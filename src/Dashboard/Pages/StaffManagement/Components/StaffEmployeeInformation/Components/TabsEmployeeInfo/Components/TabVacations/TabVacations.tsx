import React, { useEffect, useState } from "react";
import TableVacationsInfo from "./TableVacationsInfo";
import { EmployeeVacationCarousel } from "./components/EmployeeVacationCarousel";
import { useEmployeeVacation } from "@/hooks/employee/manage/vacation/useEmployeeVacation";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EmployeeVacationYears from "./components/EmployeeVacationCarousel/EmployeeVacationYears";
import { useEmployeeInformation } from "@/hooks/employee/manage/information/useEmployeeInformation";
import { VacationData } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { queryClient } from "@/utils/queryClient";

const TabVacations = () => {

    const { t } = useTranslation("staffManagement");
    
    const [selectedYear, setSelectedYear] = useState<string>("");

    const { id } = useParams();

    const { data: employeeData, isPending: isEmployeePending } = useEmployeeInformation();

    const { data: vacationData, isPending } = useEmployeeVacation(selectedYear);

    useEffect(() => {
        if (selectedYear) {

            axiosInstance
                .get<VacationData>(endpoints.employee.manage.vancation.show(id ?? ""), {
                    params: { year: selectedYear }
                })
                .then((res) => {
             
                    queryClient.setQueryData(
                        ["employee-vacation-information", id],
                        res.data
                    );
                })
                .catch((error) => {
                    console.error("Error updating vacation data:", error);
                });

            console.log("API called for year:", selectedYear);
        }
    }, [selectedYear]);

    if (isPending) return <Loading />;

    if (!vacationData?.vacations) return <div>{t("common.noData")}</div>;

    const { vacations, types: vacationTypes } = vacationData;

    return (

        <div className="tab-vacations">
            
          {employeeData && (
                <EmployeeVacationYears employee={employeeData} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            )}
            
            <EmployeeVacationCarousel vacationTypes={vacationTypes} />

  
            <TableVacationsInfo
                vacations={vacations}
                vacationsTypes={vacationTypes}
                employeeId={id ?? ""}
            />
        </div>
    );
};

export default TabVacations;
