import React from "react";
import TaskDeleteIcon from "@assets/images/sidebaricons/taskdeleteicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TableViolationsManagementPage from "./TableViolationsManagementPage/TableViolationsManagementPage";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const HomeViolationsManagementPage = () => {
    const { t } = useTranslation("violations");

    return (
        <>
            <HelmetInfo titlePage={t("pageTitle.violationsManagement")} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={
                        FullRoutes.Dashboard.ViolationsManagement.All
                    }
                    iconNewPageText={<img src={TaskDeleteIcon} alt="violations" />}
                    textNewPage={t("pageTitle.violationsManagement")}
                    isPageDefault={false}
                    defaultePageRoute={FullRoutes.Dashboard.ViolationsManagement.All}
                    textDefaultPage={""}
                    isShowTitleTextPage={false}
                    titleTextPage={""}
                />
            </header>

            <main data-aos="fade-up">
                <TableViolationsManagementPage />
            </main>
        </>
    );
};

export default HomeViolationsManagementPage;
