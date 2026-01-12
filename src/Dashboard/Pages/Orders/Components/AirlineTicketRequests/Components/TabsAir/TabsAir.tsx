import React from "react";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import TabBookAirlineTicket from "../ContentTabsInfo/TabsBookAirline/TabBookAirlineTicket";
import TabPayFlightAmount from "../ContentTabsInfo/TabPayFlightAmount/TabPayFlightAmount";
import TabAirlineTicketAllowance from "../ContentTabsInfo/TabAirlineTicketAllowance/TabAirlineTicketAllowance";
import { useTranslation } from "react-i18next";

interface TabsAirProps {
  employeeId: string | null;
}

const TabsAir: React.FC<TabsAirProps> = ({ employeeId }) => {
  const { t } = useTranslation("orders");

  const tabsData = [
    {
      label: t("airlineTickets.tabs.bookTicket"),
      content: <TabBookAirlineTicket employeeId={employeeId} />
    },
    {
      label: t("airlineTickets.tabs.allowance"),
      content: <TabAirlineTicketAllowance employeeId={employeeId} />
    },
    {
      label: t("airlineTickets.tabs.payAmount"),
      content: <TabPayFlightAmount employeeId={employeeId} />
    }
  ];
  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3">{t("common.newRequest")}</h2>
      <div className="mt-5">
        <HorizontalTabs newClassName={""} isBgTabButton={true} tabsData={tabsData} />
      </div>
    </div>
  );
};

export default TabsAir;
