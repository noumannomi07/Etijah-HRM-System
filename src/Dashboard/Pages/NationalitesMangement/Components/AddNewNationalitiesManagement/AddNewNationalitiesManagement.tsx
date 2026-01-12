import React from 'react';
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddNewNationalitiesManagement from "./FormAddNationalitiesManagement";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FullRoutes } from "@/Routes/routes";

const AddNewNationalitiesManagement = () => {
    return (
        <>
            <HelmetInfo titlePage={"إضافة جنسية جديد"} />

            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.NationalitiesManagement.All}
                    iconNewPageText={<img src={GridIcon2} alt="grid" />}
                    textNewPage={"الجنسيات"}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={true}
                    titleTextPage={"إضافة جنسية جديد"}
                />
            </header>
            <ButtonBack
                isRouteDashboard={true}
                routeLink="nationalities-management"
                addNewRoute={false}
                isTextBack={true}
                AddNewTextButton={""}
            />
            <main data-aos="fade-up">
                <FormAddNewNationalitiesManagement />
            </main>
        </>
    );
};

export default AddNewNationalitiesManagement;
