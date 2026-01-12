import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddNewTask from "./FormAddNewTask";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import ListViewRectangle from "@assets/images/sidebaricons/listviewrectangle.svg";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewTask = () => {
  const { t } = useTranslation('tasks');
  
  return (
    <>
      <HelmetInfo titlePage={t('breadcrumb.addNewTask')} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Tasks.All}
          iconNewPageText={<img src={ListViewRectangle} alt="time" />}
          textNewPage={t('breadcrumb.companyTasks')}
          isShowTitleTextPage={true}
          titleTextPage={t('breadcrumb.addNewTask')}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="tasks-page"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewTask />
      </main>
    </>
  );
};

export default AddNewTask;
