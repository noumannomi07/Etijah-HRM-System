import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { StarIcon } from "@radix-ui/react-icons";
import FormAddNewBouns from "./FormAddNewBouns";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const AddNewBonus = () => {
  const { t } = useTranslation('bonus');
  
  return (
    <>
      <HelmetInfo titlePage={t('breadcrumb.addNewBonus')} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Bonus.All}
          iconNewPageText={<StarIcon />}
          textNewPage={t('breadcrumb.bonus')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={true}
          titleTextPage={t('breadcrumb.addNewBonus')}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="bonus-page"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewBouns />
      </main>
    </>
  );
};

export default AddNewBonus;
