import HelmetInfo from "@components/HelmetInfo/HelmetInfo"
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault"
import ContentCompanyNews from "./ContentCompanyNews/ContentCompanyNews"
import { useTranslation } from "react-i18next";


const HomeCompanyNews = () => {
  const { t } = useTranslation('addNewNewsCompany');
  return (
    <> <HelmetInfo titlePage={t("companyNews")} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={true}
          isShowSlashHome={false}
          isDashboardRouteHomePage={true}
          isShowNewLinkPage={false}
          routeOfNewLinkPage={false}
          iconNewPageText={false}
          textNewPage={false}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={true}
          titleTextPage={t("companyNews")}
        />
      </header>
      <main data-aos="fade-up">
        <ContentCompanyNews />
      </main>
    </>
  )
}

export default HomeCompanyNews