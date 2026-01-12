import React from "react";
import TableJobTitle from "./TableJobTitle/TableJobTitle";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

const HomeDepartments = () => {
    return (
        <>
            <HelmetInfo titlePage={"المسميات الوظيفية"} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.JobTitle.All}
                    iconNewPageText={<img src={GridIcon2} alt="grid" />}
                    textNewPage={"المسميات الوظيفية"}
                    isPageDefault={false}
                    isShowTitleTextPage={false}
                />
            </header>

            <main data-aos="fade-up">
                <TableJobTitle />
            </main>
        </>
    );
};

export default HomeDepartments;
