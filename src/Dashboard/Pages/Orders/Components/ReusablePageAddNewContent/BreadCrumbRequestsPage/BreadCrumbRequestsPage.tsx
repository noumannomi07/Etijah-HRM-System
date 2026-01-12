import React from "react";
import OrderPageIcon from "@assets/images/iconspages/orderpageicon.svg";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FullRoutes } from '@/Routes/routes';

interface BreadCrumbRequestsPageProps {
    titlePage: string;
}

const BreadCrumbRequestsPage: React.FC<BreadCrumbRequestsPageProps> = ({
    titlePage,
}) => {
    const { t } = useTranslation("orders");


    return (
        <>
            <BreadcrumbsDefault
                isShowTitleHomePage={false}
                isShowSlashHome={false}
                isDashboardRouteHomePage={false}
                isShowNewLinkPage={true}
                routeOfNewLinkPage={FullRoutes.Dashboard.Orders.All}
                iconNewPageText={
                    <img src={OrderPageIcon} alt={t("altText.orderIcon")} />
                }
                textNewPage={t("pageTitle")}
                isPageDefault={true}
                defaultePageRoute={undefined}
                textDefaultPage={titlePage}
                isShowTitleTextPage={true}
                titleTextPage={t("businessExpenses.newRequest")}
            />
        </>
    );
};
BreadCrumbRequestsPage.propTypes = {
    titlePage: PropTypes.string.isRequired,
};
export default BreadCrumbRequestsPage;
