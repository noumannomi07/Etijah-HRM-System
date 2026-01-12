import "./HeaderEmployeeInfo.css";
import HeaderProfileInfo from "@/Dashboard/Shared/HeaderProfileInfo/HeaderProfileInfo";
import React from "react";
import { useEmployeeContext } from "../../../StepsAddNewEmployee/providers/EmployeeProvider";
import { Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const HeaderEmployeeInfo = () => {
    const navigate = useNavigate();
    const params = useParams<{ id?: string }>();
    const { t } = useTranslation("staffManagement");

    const { employee, isPending } = useEmployeeContext();
    const employeeFullName = `${employee?.first_name ?? ""} ${employee?.last_name ?? ""
        }`;
    const image = employee?.image;

    const getMissingItems = () => {
        const missingItems = [];
        if (!employee?.files?.length) missingItems.push(t("employeeTabs.documents"));
        if (employee?.salaries === null) missingItems.push(t("employeeTabs.salary"));
        // if (employee?.tickets === null) missingItems.push(t("employeeTabs.airlineTickets"));
        if (employee?.workdata === null) missingItems.push(t("steps.workInformation"));
        if (employee?.insurance === null) missingItems.push(t("employeeTabs.medicalInsurance"));
        return missingItems;
    };

    const missingItems = getMissingItems();

    if (isPending) {
        return <Skeleton />;
    }

    const handleNavigateToEditPage = () => {
        const id = employee?.id ?? params.id;
        if (id) {
            navigate(
                FullRoutes.Dashboard.StaffManagement.StepsAddEmployeeDataWithId(
                    { id }
                )
            );
        }
    };

    return (
        <div>
            <HeaderProfileInfo
                id={employee?.id}
                imageUser={image}
                nameUser={
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px]">{employeeFullName}</span>
                        {employee?.endservice === 0 ? ( 
                            <span className="px-3 py-1 text-[13px] font-semibold rounded-md border border-green-200 bg-green-50 text-green-700 shadow-sm">
                                {t("table.active")}
                            </span>
                        ) : (
                            <span className="px-3 py-1 text-[13px] font-semibold rounded-md border border-red-200 bg-red-50 text-red-700 shadow-sm">
                                {t("table.inactive")}
                            </span>
                        )}
                    </div>
                }
                isShowToggle={false}
                textInfoWork={employee?.jobtitle?.title ?? "-"}
                emailUser={employee?.email ?? "-"}
                phoneUser={employee?.phone ?? "-"}
                functionEditInfoUser={handleNavigateToEditPage}
            />
            {missingItems.length > 0 && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl py-2.5 px-4 mt-3 shadow-sm">
                    <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="flex flex-wrap gap-1.5">
                            {missingItems.map((item, index) => (
                                <span key={index} className="status-danger backdrop-blur-sm text-red-600 text-[13px] px-2 py-0.5 rounded-lg border border-red-100 font-medium">
                                    {item} {t("employeeTabs.missing")}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderEmployeeInfo;
