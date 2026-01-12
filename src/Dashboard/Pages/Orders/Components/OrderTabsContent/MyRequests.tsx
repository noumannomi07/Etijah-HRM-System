import React from "react";
import OrderTabsContent from "./OrderTabsContent";
import OrderPageIcon from "@assets/images/iconspages/orderpageicon.svg";
import { useTranslation } from "react-i18next";

const MyRequests = () => {
    const { t } = useTranslation("orders");

    return (
        <>
            <h2 className="title text-font-gray pt-1 pb-3 item-center-flex gap-1">
                <img src={OrderPageIcon} alt={t("altText.orderIcon")} />
                {t("myRequests")}
            </h2>
            <OrderTabsContent filter="mine" />
        </>
    );
};

export default MyRequests;
