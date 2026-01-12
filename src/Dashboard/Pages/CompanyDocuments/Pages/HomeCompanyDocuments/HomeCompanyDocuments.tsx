import ArchiveIcon from "@assets/images/sidebaricons/archiveicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TableCompanyDocuments from "./TableCompanyDocuments/TableCompanyDocuments";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const HomeCompanyDocuments = () => {
  const { t } = useTranslation('companyDocuments');
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.CompanyDocuments.All}
          iconNewPageText={<img src={ArchiveIcon} alt="archive" />}
          textNewPage={t('breadcrumb.companyDocuments')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main data-aos="fade-up">
        <TableCompanyDocuments />
      </main>
    </>
  );
};

export default HomeCompanyDocuments;
