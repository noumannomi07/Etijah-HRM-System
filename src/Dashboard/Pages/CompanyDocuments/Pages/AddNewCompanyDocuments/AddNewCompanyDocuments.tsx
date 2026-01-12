import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { useParams } from "react-router-dom";
import FormAddNewCompanyDocuments from "./FormAddNewCompanyDocuments";
import ArchiveIcon from "@assets/images/sidebaricons/archiveicon.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";


const AddNewCompanyDocuments = () => {
  const { id } = useParams(); // ID OF CARD TD
  const { t } = useTranslation('companyDocuments');

  return (
    <>
      <HelmetInfo titlePage={t('breadcrumb.addNewDocument')} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.CompanyDocuments.All}
          iconNewPageText={<img src={ArchiveIcon} />}
          textNewPage={t('breadcrumb.companyDocuments')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={true}
          titleTextPage={t('breadcrumb.addNewDocument')}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="company-documents"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewCompanyDocuments />
      </main>
    </>
  );
};

export default AddNewCompanyDocuments;
