import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddSalary from "./FormAddSalary";
import { CommonRouteKeys, FullRoutes, RelativeRoutes } from "@/Routes/routes";
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddSalaryConfiguration = () => {
  const { t } = useTranslation("staffManagement");
  const { id } = useParams<{ id: string }>();
  return (
    <div className="add-salary-configuration">
      <BreadcrumbsDefault
        isShowTitleHomePage={false}
        isShowSlashHome={false}
        isDashboardRouteHomePage={false}
        isShowNewLinkPage={true}
        routeOfNewLinkPage={FullRoutes.Dashboard.StaffManagement.All}
        iconNewPageText={<img src={UsersIcon} alt="users" />}
        textNewPage={t("pageTitle.staffManagement")}
        isPageDefault={false}
        defaultePageRoute=""
        textDefaultPage=""
        isShowTitleTextPage={true}
        titleTextPage={t("salary.addSalaryConfiguration")}
      />
      <header>
        <div className="header-page-request">
          <ButtonBack
            isRouteDashboard={true}
            routeLink={document.referrer}
            isTextBack={true}
            AddNewTextButton={""}
            addNewRoute=""
          />
        </div>
      </header>
      <main>
        <FormAddSalary />
      </main>
    </div>
  );
};

export default AddSalaryConfiguration;
