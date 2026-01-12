import StarIcon from "@assets/images/sidebaricons/staricon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TableBouns from "./Components/TableBouns/TableBouns";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const HomeBonusPage = () => {
  const { t } = useTranslation('bonus');
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Bonus.All}
          iconNewPageText={<img src={StarIcon} />}
          textNewPage={t('breadcrumb.bonus')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main data-aos="fade-up">
        <TableBouns />
      </main>
    </>
  );
};

export default HomeBonusPage;
