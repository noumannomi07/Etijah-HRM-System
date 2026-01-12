import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import InformationWorkIcon from "@assets/images/staffmanagementpage/iconssteps/informationworkicon";
import UserSingle from "@/assets/images/staffmanagementpage/user-single";
import EmployeeInfoData from "./Components/EmployeeInfoData";
import WorkEmployeeInfo from "./Components/WorkEmployeeInfo";
import { useTranslation } from "react-i18next";
import React from "react";

const TabEmployeeInfo = () => {
  const { t } = useTranslation("staffManagement");

  const tabsData = [
    {
      label: (
        <>
          <UserSingle /> {t("employeeInfo.personalInfo")}
        </>
      ),
      content: <EmployeeInfoData />
    },
    {
      label: (
        <>
          <InformationWorkIcon /> {t("employeeInfo.workInfo")}
        </>
      ),
      content: <WorkEmployeeInfo />
    }
  ];

  return <HorizontalTabs tabsData={tabsData} />;
};

export default TabEmployeeInfo;
