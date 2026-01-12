import React from "react";
import TableNationalitiesManagement from "./TableNationalitiesManagement/TableNationalitiesManagement";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

const HomeDepartments = () => {
    return (
        <>
            <HelmetInfo titlePage={"الجنسيات"} />
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
                    isShowTitleTextPage={false}
                />
            </header>

            <main data-aos="fade-up">
                <TableNationalitiesManagement />
            </main>
        </>
    );
};

export default HomeDepartments;
