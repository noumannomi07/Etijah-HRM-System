import React from "react";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import InformationWorkIcon from "@assets/images/staffmanagementpage/iconssteps/informationworkicon";
// import UserSingle from "@/assets/images/staffmanagementpage/user-single";
import { useTranslation } from "react-i18next";
import Payroll from "./Payroll";
import Adjustment from "./Adjustment";
import TabTransaction from "./TabTransaction";

const TabEmployeeInfo = () => {
  const { t } = useTranslation("staffManagement");

  const tabsData = [
    // {
    //     label: (
    //         <>
    //             <UserSingle /> {t("salary.title")}
    //         </>
    //     ),
    //     content: <TabTwoContent />,
    // },
    {
      label: (
        <>
          <InformationWorkIcon /> {t("salary.payroll.title")}
        </>
      ),
      content: <Payroll />
    },

    {
      label: (
        <>
          <InformationWorkIcon /> {t("salary.adjustment.title")}
        </>
      ),
      content: <Adjustment />
    },
    {
      label: (
        <>
          <InformationWorkIcon /> {t("salary.transaction.title")}
        </>
      ),
      content: <TabTransaction />
    }
  ];

  return <HorizontalTabs tabsData={tabsData} />;
};

export default TabEmployeeInfo;
