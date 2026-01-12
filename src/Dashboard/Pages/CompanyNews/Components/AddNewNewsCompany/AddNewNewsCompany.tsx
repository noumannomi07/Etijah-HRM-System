import FormAddNewNewsCompany from "./FormAddNewNewsCompany";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const AddNewNewsCompany = () => {
  const{t}=useTranslation("addNewNewsCompany")
  return (
    <>
      <HelmetInfo titlePage={"اضافة خبر جديد"} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={true}
          isShowSlashHome={true}
          isDashboardRouteHomePage={true}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.CompanyNews.All}
          iconNewPageText={<FontAwesomeIcon icon={faHome} />}
          textNewPage={t("companyNews")}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={true}
          titleTextPage={t("addNewNews")}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="company-News"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewNewsCompany />
      </main>
    </>
  );
};

export default AddNewNewsCompany;
