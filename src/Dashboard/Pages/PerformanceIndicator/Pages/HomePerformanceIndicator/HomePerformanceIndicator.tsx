import React from "react";
import ChartIcon from "@assets/images/sidebaricons/charticon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TablePerformanceIndicator from "./TablePerformanceIndicator";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const HomePerformanceIndicator = () => {
    const { t } = useTranslation('performance');
    
    return (
        <>
            <HelmetInfo titlePage={t('pageTitle')} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={
                        FullRoutes.Dashboard.PerformanceIndicator.All
                    }
                    iconNewPageText={<img src={ChartIcon} alt="chart" />}
                    textNewPage={t('breadcrumb.performanceIndicator')}
                    isPageDefault={false}
                    isShowTitleTextPage={false}
                />
            </header>

            <main>
                <TablePerformanceIndicator />
            </main>
        </>
    );
};

export default HomePerformanceIndicator;
