import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

const Orders = () => {
  const { t } = useTranslation("orders");

  return (
    <>
      <HelmetInfo titlePage={t("pageTitle")} />
      <div className="order-page">
        <Outlet />
      </div>
    </>
  );
};

export default Orders;
