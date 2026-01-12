import React from "react";
import { useEmployeeInformation } from "@/hooks/employee/manage/information/useEmployeeInformation";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import { Skeleton } from "@mui/material";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const EmployeeInfoData = () => {
    const { t } = useTranslation("staffManagement");
    const { data: employee, isPending } = useEmployeeInformation();
    const langgg = i18next.language;

    const details = [
        { titleDetails: t("personalInfo.firstName"), value: employee?.first_name },
        { titleDetails: t("personalInfo.lastName"), value: employee?.last_name },
        { titleDetails: t("personalInfo.fullName"), value: employee?.full_name },
        { titleDetails: t("personalInfo.birthDate"), value: employee?.birth_date },
     
        { titleDetails: t("personalInfo.nationality"), value: employee?.nationality?.title },
        { titleDetails: t("personalInfo.mobile"), value: employee?.phone },

        { titleDetails: t("personalInfo.phone"), value: employee?.phone },
      
        {
            titleDetails: t("personalInfo.gender"),
            value: employee?.gender == "male" ? t("genderOptions.male") : t("genderOptions.female"),
        },
        { titleDetails: t("personalInfo.email"), value: employee?.email },
        { titleDetails: t("employeeInfo.idNumber"), value: employee?.id_number },
        {
            titleDetails: t("personalInfo.maritalStatus"),
            value: employee?.marital_status != "single"
                ? t("maritalStatusOptions.married")
                : t("maritalStatusOptions.single"),
        },

        {
            titleDetails: t("employeeInfo.addedDate"),
            value:
                langgg == "ar"
                    ? theDateObj.formatDataFunctionAR(employee?.created_at)
                    : theDateObj.formatDataFunctionEN(employee?.created_at),
        },
        {
            titleDetails: t("personalInfo.role"),
            value: employee?.workdata?.role?.name,
        },
    ];

    if (isPending) {
        return <Skeleton variant="rectangular" width={110} height={100} />;
    }
 
    return (
        <div className="all-data-user grid-cards-2 padding-t-3">
            {details.map((detail, index) => (
                <DetailsInfoDiv
                    key={index}
                    newClassName=""
                    titleDetails={detail.titleDetails}
                    textDetails={detail.value ?? "-"}
                />
            ))}
        </div>
    );
};

export default EmployeeInfoData;
