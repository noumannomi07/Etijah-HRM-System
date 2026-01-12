import React from 'react';
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddNewJobTitles from "./FormAddNewJobTitles";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FullRoutes } from "@/Routes/routes";

const AddNewJobTitles = () => {
    return (
        <>
            <HelmetInfo titlePage={"إضافة مسمي وظيفي جديد"} />

            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.JobTitle.All}
                    iconNewPageText={<img src={GridIcon2} alt="grid" />}
                    textNewPage={"اعدادات الموظفين"}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={true}
                    titleTextPage={"إضافة مسمي وظيفي جديد"}
                />
            </header>
            <ButtonBack
                isRouteDashboard={true}
                routeLink="job-title-page"
                addNewRoute={false}
                isTextBack={true}
                AddNewTextButton={""}
            />
            <main data-aos="fade-up">
                <FormAddNewJobTitles />
            </main>
        </>
    );
};

export default AddNewJobTitles;
