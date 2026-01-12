import MoneyIcon from "@assets/images/sidebaricons/moneyicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import TableSalaryAdjustments from "./Components/TableSalaryAdjustments/TableSalaryAdjustments";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const HomeSalaryAdjustments = () => {
    const { t } = useTranslation('salaryAdjustments');
    
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
                        FullRoutes.Dashboard.SalaryAdjustments.All
                    }
                    iconNewPageText={<img src={MoneyIcon} alt="money" />}
                    textNewPage={t('pageTitle')}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={false}
                    titleTextPage={false}
                />
            </header>

            <main data-aos="fade-up">
                <TableSalaryAdjustments />
            </main>
        </>
    );
};

export default HomeSalaryAdjustments;
