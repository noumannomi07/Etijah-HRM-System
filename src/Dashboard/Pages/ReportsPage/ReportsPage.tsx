import ChartBarIcon from "@assets/images/sidebaricons/chartbaricon.svg"
import HelmetInfo from "@components/HelmetInfo/HelmetInfo"
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault"
import TabsReportsPage from "./Components/TabsReportsPage/TabsReportsPage"
import { FullRoutes } from "@/Routes/routes"
import { withPermissions } from "@/hoc";
import { useTranslation } from "react-i18next";

const ReportsPage = () => {
  const { t } = useTranslation('staffManagement');
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle.reports')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          iconNewPageText={<img src={ChartBarIcon} />}
          routeOfNewLinkPage={FullRoutes.Dashboard.Reports}
          textNewPage={t('pageTitle.reports')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main>
        <TabsReportsPage />
      </main>
    </>
  )
}

export default withPermissions(ReportsPage, "reports");
