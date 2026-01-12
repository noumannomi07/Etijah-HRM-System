import React from "react";
import { VerticalTabs } from "@/Dashboard/Shared/VerticalTabs/VerticalTabs";
import VacationsRequests from "../VacationsRequests/VacationsRequests";
import PermissionRequests from "../PermissionRequests/PermissionRequests";
import PredecessorRequests from "../PredecessorRequests/PredecessorRequests";
import LetterRequests from "../LetterRequests/LetterRequests";
import BusinessExpenseRequests from "../BusinessExpenseRequests/BusinessExpenseRequests";
import AirlineTicketRequests from "../AirlineTicketRequests/AirlineTicketRequests";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import "./OrderTabsContent.css";
import OrderDate from "@/assets/images/orderpage/icons/order-date";
import OrderPermission from "@/assets/images/orderpage/icons/order-permission";
import OrderLogin from "@/assets/images/orderpage/icons/order-login";
import OrderMoney from "@/assets/images/orderpage/icons/order-money";
import OrderText from "@/assets/images/orderpage/icons/order-text";
import OrderBag from "@/assets/images/orderpage/icons/order-bag";
import OrderPlane from "@/assets/images/orderpage/icons/order-plane";
import LeaveBalance from "../LeaveBalance/LeaveBalance";

interface OrderTabsContentProps {
  filter?: "mine" | "all";
}

const OrderTabsContent: React.FC<OrderTabsContentProps> = ({
  filter = "all"
}) => {
  const { t } = useTranslation("orders");

  const { data: requestsCount } = useQuery({
    queryKey: ["requestsCount"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.orders.requestsCount);
      return response.data;
    }
  });

  // Base tabs that show in both "All Requests" and "My Requests"
  const baseTabs = [
    {
      label: (
        <div className="tab-label-wrapper">
          <OrderDate />
          <span className="tab-text">{t("requestTypes.vacationRequests")}</span>
          {requestsCount?.vacations > 0 && (
            <span className="badge bg-light-red">
              {requestsCount?.vacations}
            </span>
          )}
        </div>
      ),
      value: "0",
      desc: <VacationsRequests filter={filter} />
    },
    {
      label: (
        <div className="tab-label-wrapper">
          <OrderPermission/>
          <span className="tab-text">
            {t("requestTypes.permissionRequests")}
          </span>
          {requestsCount?.leaveRequests > 0 && (
            <span className="badge bg-light-red">
              {requestsCount?.leaveRequests}
            </span>
          )}
        </div>
      ),
      value: "1",
      desc: <PermissionRequests filter={filter} />
    },
    {
      label: (
        <div className="tab-label-wrapper">
          <OrderMoney />
          <span className="tab-text">{t("requestTypes.advanceRequests")}</span>
          {requestsCount?.advances > 0 && (
            <span className="badge bg-light-red">
              {requestsCount?.advances}
            </span>
          )}
        </div>
      ),
      value: "2",
      desc: <PredecessorRequests filter={filter} />
    },
    {
      label: (
        <div className="tab-label-wrapper">
         <OrderText/>
          <span className="tab-text">{t("requestTypes.letterRequests")}</span>
          {requestsCount?.letters > 0 && (
            <span className="badge bg-light-red">{requestsCount?.letters}</span>
          )}
        </div>
      ),
      value: "3",
      desc: <LetterRequests filter={filter} />
    },
    {
      label: (
        <div className="tab-label-wrapper">
          <OrderBag />
          <span className="tab-text">
            {t("requestTypes.businessExpenseRequests")}
          </span>
          {requestsCount?.expenses > 0 && (
            <span className="badge bg-light-red">
              {requestsCount?.expenses}
            </span>
          )}
        </div>
      ),
      value: "4",
      desc: <BusinessExpenseRequests filter={filter} />
    },
    {
      label: (
        <div className="tab-label-wrapper">
          <OrderPlane />
          <span className="tab-text">
            {t("requestTypes.airlineTicketRequests")}
          </span>
          {requestsCount?.tickets > 0 && (
            <span className="badge bg-light-red">{requestsCount?.tickets}</span>
          )}
        </div>
      ),
      value: "5",
      desc: <AirlineTicketRequests filter={filter} />
    }
  ];

  // Leave Balance tab - only show in "My Requests"
  const leaveBalanceTab = {
    label: (
      <div className="tab-label-wrapper">
               <OrderLogin />

        <span className="tab-text">{t("requestTypes.leaveBalance")}</span>
          {requestsCount?.tickets > 0 && (
            <span className="badge bg-light-red">{requestsCount?.leaveBalance || 0}</span>
          )}
      </div>
    ),
    value: "6",
    desc: <LeaveBalance filter={filter} />
  };

  // Conditionally add Leave Balance tab only for "My Requests"
  const tabsData = filter === "mine" 
    ? [...baseTabs, leaveBalanceTab] 
    : baseTabs;

  return (
    <>
      <div className="all-content-order-page">
        <VerticalTabs key={filter} tabsData={tabsData} />
      </div>
    </>
  );
};

export default OrderTabsContent;
