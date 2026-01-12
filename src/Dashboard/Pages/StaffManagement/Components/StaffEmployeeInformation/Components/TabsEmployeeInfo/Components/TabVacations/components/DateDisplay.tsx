import React from "react";
import DateIcon from "@assets/images/sidebaricons/dateicon.svg";
import { useTranslation } from "react-i18next";

interface DateDisplayProps {
  date: string;
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  const { t } = useTranslation("staffManagement");

  return (
    <div className="item-center-flex">
      <img src={DateIcon} alt={t("common.calendarIcon", "Calendar")} />
      {date}
    </div>
  );
};