import TimeIcon from "@assets/images/sidebaricons/timeicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TabsHomeSystemSettings from "./TabsHomeSystemSettings/TabsHomeSystemSettings";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";
const HomeSystemSettings = () => {
    const { t } = useTranslation("systemSettings");

    return (
        <>
            <HelmetInfo titlePage={t("pageTitle.systemSettings")} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.SystemSettings.All}
                    iconNewPageText={
                        <img src={TimeIcon} alt="system settings" />
                    }
                    textNewPage={t("pageTitle.systemSettings")}
                    isPageDefault={false}
                    defaultePageRoute={FullRoutes.Dashboard.SystemSettings.All}
                    textDefaultPage={""}
                    isShowTitleTextPage={false}
                    titleTextPage={""}
                />
            </header>

            <main>
                <TabsHomeSystemSettings />
            </main>
        </>
    );
};

export default HomeSystemSettings;
