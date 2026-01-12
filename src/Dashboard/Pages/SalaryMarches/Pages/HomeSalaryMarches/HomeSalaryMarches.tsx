import DonateIcon from "@assets/images/sidebaricons/donateicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import AllHomeSalaryMarches from "./AllHomeSalaryMarches/AllHomeSalaryMarches";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const HomeSalaryMarches = () => {
  const { t } = useTranslation('salaryMarches');
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.SalaryMarches.All}
          iconNewPageText={<img src={DonateIcon} alt="donate" />}
          textNewPage={t('pageTitle')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main>
        <AllHomeSalaryMarches />
      </main>
    </>
  );
};

export default HomeSalaryMarches;
