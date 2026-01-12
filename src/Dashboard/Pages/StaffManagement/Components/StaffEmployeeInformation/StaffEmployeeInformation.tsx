import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HeaderEmployeeInfo from "./Components/HeaderEmployeeInfo/HeaderEmployeeInfo";
import TabsEmployeeInfo from "./Components/TabsEmployeeInfo/TabsEmployeeInfo";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeProvider } from "../StepsAddNewEmployee/providers/EmployeeProvider";

const StaffEmployeeInformation = () => {
  const { t } = useTranslation("staffManagement");

  return (
    <>
      <HelmetInfo titlePage={t("pageTitle.employeeInformation")} />
      <div className="staff-employee-information">
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.StaffManagement.All}
          iconNewPageText={<img src={UsersIcon} alt="users" />}
          textNewPage={t("pageTitle.staffManagement")}
          isPageDefault={false}
          isShowTitleTextPage={true}
          titleTextPage={t("pageTitle.employeeInformation")}
        />
        <EmployeeProvider>
          <div className="all-data-employee border-width-content">
            <HeaderEmployeeInfo />
            <TabsEmployeeInfo />
          </div> 
        </EmployeeProvider>
      </div>
    </>
  );
};

export default StaffEmployeeInformation;
