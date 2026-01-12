import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ChartIcon from "@assets/images/sidebaricons/charticon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import AllEvaluativeStandardPage from "./AllEvaluativeStandardPage";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const EvaluativeStandardPage = () => {
  const { t } = useTranslation('performance');
  
  return (
    <>
      <HelmetInfo titlePage={t('breadcrumb.evaluativeStandard')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.PerformanceIndicator.All}
          iconNewPageText={<img src={ChartIcon} alt="chart" />}
          textNewPage={t('breadcrumb.performanceIndicator')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={true}
          isShowTitleTextPage={true}
          titleTextPage={t('breadcrumb.evaluativeStandard')}
        />
      </header>

      <main>
        <ButtonBack
          isRouteDashboard={true}
          routeLink="performance-indicator"
          addNewRoute={false}
          isTextBack={true}
          AddNewTextButton={""}
        />
        <AllEvaluativeStandardPage />
      </main>
    </>
  );
};

export default EvaluativeStandardPage;
