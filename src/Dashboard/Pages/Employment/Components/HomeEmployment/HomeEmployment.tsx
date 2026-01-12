import UserAdd from "@assets/images/sidebaricons/useradd.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HeaderCardEmployment from "./HeaderCardEmployment/HeaderCardEmployment";
import TableEmployment from "./TableEmployment/TableEmployment";
import { FullRoutes } from "@/Routes/routes";
import { useApplicants } from "@/hooks/api";
import { useTranslation } from "react-i18next";

const HomeEmployment = () => {
  const { t } = useTranslation('employment');
  const { queryAll } = useApplicants();

  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Employment.All}
          iconNewPageText={<img src={UserAdd} alt="add user" />}
          textNewPage={t('breadcrumb.employment')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={""}
        />
      </header>

      <main>
        <HeaderCardEmployment queryAll={queryAll} />
        <div data-aos="fade-up">
          <TableEmployment queryAll={queryAll} />
        </div>
      </main>
    </>
  );
};

export default HomeEmployment;
