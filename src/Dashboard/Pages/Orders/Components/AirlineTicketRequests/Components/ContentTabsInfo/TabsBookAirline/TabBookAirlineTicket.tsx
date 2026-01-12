import React from "react";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import TabOneWayTrip from "./TabOneWayTrip";
import TabRoundTrip from "./TabRoundTrip";

interface TabBookAirlineTicketProps {
  employeeId: string | null;
}

const TabBookAirlineTicket: React.FC<TabBookAirlineTicketProps> = ({ employeeId }) => {
  const tabsData = [
    {
      label: "رحلة ذهاب وإياب",
      content: <TabRoundTrip employeeId={employeeId} />
    },
    {
      label: "رحلة إتجاه واحد",
      content: <TabOneWayTrip employeeId={employeeId} />
    }
  ];
  return (
    <div className="tabs-form-mileage mt-5">
      <HorizontalTabs
        newClassName={""}
        isBgTabButton={true}
        tabsData={tabsData}
      />
    </div>
  );
};

export default TabBookAirlineTicket;
