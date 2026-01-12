import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import OrderPageIcon from "@assets/images/iconspages/orderpageicon.svg";
import TabRequest from "./TabRequest";
import MyRequests from "./MyRequests";
import "./AllTabsOrders.css"
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const AllTabsOrders = () => {
  const { t } = useTranslation("orders");

  const tabsData = [
    {
      label: t("tabs.orders"),
      content: <TabRequest />
    },
    {
      label: t("tabs.myOrders"),
      content: <MyRequests />
    }
  ];

  return (
    <div className="all-orders-tabs-header">
      <BreadcrumbsDefault
        isShowTitleHomePage={false}
        isShowSlashHome={false}
        isDashboardRouteHomePage={false}
        isShowNewLinkPage={true}
        routeOfNewLinkPage={FullRoutes.Dashboard.Orders.All}
        iconNewPageText={<img src={OrderPageIcon} alt={t("altText.orderIcon")} />}
        textNewPage={t("pageTitle")}
        isPageDefault={false}
        defaultePageRoute={""}
        textDefaultPage={""}
        isShowTitleTextPage={false}
        titleTextPage={""}
      />
      <HorizontalTabs newClassName={""} isBgTabButton={true} tabsData={tabsData} />
    </div>
  );
};

export default AllTabsOrders;
