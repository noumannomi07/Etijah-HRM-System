import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TableStaff from "./Components/TableStaff";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const HomeStaffManagment = () => {
  const { t } = useTranslation("staffManagement");

  return (
    <>
      <BreadcrumbsDefault
        isShowTitleHomePage={false}
        isShowSlashHome={false}
        isDashboardRouteHomePage={false}
        isShowNewLinkPage={true}
        routeOfNewLinkPage={FullRoutes.Dashboard.StaffManagement.All}
        iconNewPageText={<img src={UsersIcon} alt="users" />}
        textNewPage={t("pageTitle.staffManagement")}
      />
      <div data-aos="fade-up">
        <TableStaff />
      </div>
    </>
  );
};

export default HomeStaffManagment;
