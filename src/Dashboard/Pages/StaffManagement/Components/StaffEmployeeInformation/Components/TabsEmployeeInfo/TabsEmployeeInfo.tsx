import React from "react";
import AssetsIcon from "@assets/images/staffmanagementpage/iconssteps/assetsicon";

import { VerticalTabs } from "@/Dashboard/Shared/VerticalTabs/VerticalTabs";
import TabEmployeeInfo from "./Components/TabEmployeeInfo/TabEmployeeInfo";
import TabAttendance from "./Components/TabAttendance/TabAttendance";
import TabVacations from "./Components/TabVacations/TabVacations";
import TabAirlineTickets from "./Components/TabAirlineTickets/TabAirlineTickets";
import AirplaneIcon from "@assets/images/staffmanagementpage/iconssteps/airplaneicon";
import TabMedicalInsurance from "./Components/TabMedicalInsurance/TabMedicalInsurance";
import TabTasks from "./Components/TabTasks/TabTasks";
import TabSalary from "./Components/TabSalary/TabSalary";
import Violation from "./Components/TabViolation/TabViolation";
import EndService from "./Components/TabEndService/TabEndService";
import Performance from "./Components/TabPerformance/TabPerformance";
import MedicalInsuranceIcon from "@assets/images/staffmanagementpage/iconssteps/medicalinsuranceicon";

import { useEmployeeSalary } from "@/hooks/employee/manage/salary/useEmployeeSalary";
import { useTranslation } from "react-i18next";

import DocumentEmployeeInfo from "./Components/TabEmployeeInfo/Components/DocumentEmployeeInfo";
import AssetsEmployeeInfo from "./Components/TabEmployeeInfo/Components/AssetsEmployeeInfo";
import UserSingle from "@/assets/images/staffmanagementpage/user-single";
import DateCheck from "@/assets/images/staffmanagementpage/date-check";
import Documents from "@/assets/images/staffmanagementpage/iconssteps/documents";
import Money2 from "@/assets/images/staffmanagementpage/money2";
import ListViewRectangle from "@/assets/images/sidebaricons/listviewrectangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCircleQuestion,
  faClock
} from "@fortawesome/free-regular-svg-icons";

const TabsEmployeeInfo = () => {
  const { data: employeeSalary } = useEmployeeSalary();
  const { t } = useTranslation("staffManagement");

  const tabsData = [
    {
      label: (
        <>
          <UserSingle /> {t("employeeTabs.employeeInfo")}{" "}
        </>
      ),
      value: "TabEmployeeInfo",
      desc: <TabEmployeeInfo />
    },
    {
      label: (
        <>
          {" "}
          <DateCheck /> {t("employeeTabs.attendance")}{" "}
        </>
      ),
      value: "TabAttendance",
      desc: <TabAttendance />
    },
    {
      label: (
        <>
          <Documents /> {t("employeeTabs.vacations")}{" "}
        </>
      ),
      value: "TabVacations",
      desc: <TabVacations />
    },
    {
      label: (
        <>
          <Money2 /> {t("employeeTabs.salary")}{" "}
          {!employeeSalary?.salary && (
            <span className="status-danger">{t("employeeTabs.missing")}</span>
          )}
        </>
      ),
      value: "MoneyIcon2",
      desc: <TabSalary />
    },
    {
      label: (
        <>
          <Documents /> {t("employeeTabs.documents")}{" "}
        </>
      ),
      value: "DocumentEmployeeInfo",
      desc: <DocumentEmployeeInfo />
    },
    {
      label: (
        <>
          <AssetsIcon /> {t("employeeTabs.assets")}{" "}
        </>
      ),
      value: "AssetsEmployeeInfo",
      desc: <AssetsEmployeeInfo />
    },
    {
      label: (
        <>
          {" "}
          <AirplaneIcon /> {t("employeeTabs.airlineTickets")}{" "}
        </>
      ),
      value: "TabAirlineTickets",
      desc: <TabAirlineTickets />
    },
    {
      label: (
        <>
          {" "}
          <MedicalInsuranceIcon /> {t("employeeTabs.medicalInsurance")}{" "}
        </>
      ),
      value: "TabMedicalInsurance",
      desc: <TabMedicalInsurance />
    },
    {
      label: (
        <>
          {" "}
          <ListViewRectangle /> {t("employeeTabs.tasks")}{" "}
        </>
      ),
      value: "TabTasks",
      desc: <TabTasks />
    },
    {
      label: (
        <>
          <FontAwesomeIcon icon={faCircleQuestion} />{" "}
          {t("employeeTabs.violations")}{" "}
        </>
      ),
      value: "Violation",
      desc: <Violation />
    },
    // TODO: Create the files for them
    {
      label: (
        <>
          <FontAwesomeIcon icon={faChartBar} /> {t("employeeTabs.performance")}{" "}
        </>
      ),
      value: "performance",
      desc: <Performance />
    },
    {
      label: (
        <>
          <FontAwesomeIcon icon={faClock} /> {t("employeeTabs.endService")}
        </>
      ),
      value: "EndService",
      desc: <EndService />
    }
    // {
    //     label: (
    //         <>
    //             <MedicalInsuranceIcon /> {t("employeeTabs.employeeReport")}
    //         </>
    //     ),
    //     value: "Violation2",
    //     desc: <Violation />,
    // },
  ];
  return (
    <div className="all-content-employee-page all-content-employee-page-2 border-width-content mt-7 relative">
      <VerticalTabs tabsData={tabsData} />
    </div>
  );
};

export default TabsEmployeeInfo;
