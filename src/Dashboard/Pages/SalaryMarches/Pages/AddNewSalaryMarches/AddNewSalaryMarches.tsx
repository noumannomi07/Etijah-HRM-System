import DonateIcon from "@assets/images/sidebaricons/donateicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddNewSalaryMarches from "./FormAddNewSalaryMarches";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const AddNewSalaryMarches = () => {
  const { t } = useTranslation('salaryMarches');
  
  return (
    <>
      <HelmetInfo titlePage={t('editTitle')} />

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
          isShowTitleTextPage={true}
          titleTextPage={t('editTitle')}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="salary-marches"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewSalaryMarches />
      </main>
    </>
  );
};

export default AddNewSalaryMarches;
