import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import {
    getWorkingDaysFromVacationDays,
    getDayNameFromVacationDay,
} from "@/Dashboard/utils/getWorkingDaysFromVacationDays";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WorkEmployeeInfo = () => {
    const { t } = useTranslation("staffManagement");
    const { employee } = useEmployeeContext();
    const workData = employee?.workdata;
    const navigate = useNavigate();

    const managerFullName = (
        <div
            className="text-blue-500"
            onClick={
                workData?.manger?.id
                    ? () => {
                        navigate(
                            FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                {
                                    id: String(workData?.manger?.id),
                                }
                            )
                        );
                    }
                    : undefined
            }
        >
            {workData?.manger?.first_name && workData?.manger?.last_name
                ? `${workData?.manger?.first_name} ${workData?.manger?.last_name}`
                : "-"}
        </div>
    );

    const workingPeriod =
        workData?.worktime?.time_from && workData?.worktime?.time_to
            ? `${workData?.worktime?.time_from ?? ""} - ${workData?.worktime?.time_to ?? ""
            }`
            : "-";

    const { firstWorkingDay, lastWorkingDay } = getWorkingDaysFromVacationDays(
        workData?.worktime?.vacation_days ?? []
    );
    const wokringDays = `
    ${getDayNameFromVacationDay(firstWorkingDay)}
     - 
    ${getDayNameFromVacationDay(lastWorkingDay)}
    `;

    const details = [
       
        { titleDetails: t("employeeInfo.employeeNumber"), textDetails: workData?.employee_id },
        {
            titleDetails: t("personalInfo.jobTitle"),
            textDetails: workData?.worktime?.title,
        },
        { titleDetails: t("employeeInfo.hireDate"), textDetails: workData?.hire_date },
        {
            titleDetails: t("employeeInfo.trialEndDate"),
            textDetails: workData?.trail_end,
        },
        {
            titleDetails: t("employeeInfo.directManager"),
            textDetails: managerFullName,
        },
        {
            titleDetails: t("employeeInfo.workplace"),
            textDetails: workData?.places
                .map((place: { title: string }) => place.title)
                .join(" - "),
        },
        { titleDetails: t("employeeInfo.workWeek"), textDetails: wokringDays },
        {
            titleDetails: t("employeeInfo.workShift"),
            textDetails: workData?.worktime?.title,
        },
        { titleDetails: t("personalInfo.contractType"), textDetails: employee?.contracttype?.title },
        { titleDetails: t("personalInfo.jobType"), textDetails: employee?.jobtype?.title },
        {  titleDetails: t("personalInfo.jobTitle"),  textDetails: employee?.jobtitle?.title },
        // {
        //     titleDetails: "مده الاستراحه",
        //     textDetails: workData?.worktime?.break,
        // },

        { titleDetails: t("employeeInfo.workTime"), textDetails: workingPeriod },
        {
            titleDetails: t("employeeInfo.legalResidenceCountry"),
            textDetails: workData?.law_country?.title,
        },
    ];
    return (
        <div className="all-data-user grid-cards-2 padding-t-3">
            {details.map((detail, index) => (
                <DetailsInfoDiv
                    key={index}
                    newClassName=""
                    titleDetails={detail.titleDetails}
                    textDetails={detail.textDetails}
                />
            ))}
        </div>
    );
};

export default WorkEmployeeInfo;
