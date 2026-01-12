import UserAdd from "@assets/images/sidebaricons/useradd.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import TabsAddNewEmployee from "./TabsAddNewEmployee/TabsAddNewEmployee";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const AddNewEmployee = () => {
  const { t } = useTranslation('employment');
  
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
          textDefaultPage={true}
          isShowTitleTextPage={true}
          titleTextPage={t('breadcrumb.addCandidate')}
        />
      </header>

      <main>
        <ButtonBack
          isRouteDashboard={true}
          routeLink="employmentPage"
          addNewRoute={false}
          isTextBack={true}
          AddNewTextButton={""}
        />
        <div data-aos="fade-up">
          <TabsAddNewEmployee />
        </div>
      </main>
    </>
  );
};

export default AddNewEmployee;
