import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import "./TabsFormMileage.css";
import FormDistanceValue from "./FormDistanceValue";
import FormOdometerValues from "./FormOdometerValues";
import FromMapValues from "./FromMapValues";
import React from "react";
import { useTranslation } from "react-i18next";

const TabsFormMileage = () => {
      const { t } = useTranslation("orders");
  const tabsData = [
    {
      label: t("expenses.distanceValue"),
      content: <FormDistanceValue />
    },
    {
      label: t("expenses.odometerValue"),
      content: <FormOdometerValues />
    },
    {
      label: t("expenses.mapValue"),
      content: <FromMapValues />
    }
  ];
  return (
    <div className="tabs-form-mileage mt-[30px]">
      <h2 className="text-title text-font-dark mb-5">{t("expenses.calculateBy")}</h2>
      <HorizontalTabs newClassName={""} isBgTabButton={true} tabsData={tabsData} />
    </div>
  );
};

export default TabsFormMileage;
