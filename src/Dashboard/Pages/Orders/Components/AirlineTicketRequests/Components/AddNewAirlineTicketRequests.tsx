import React from "react";
import ReusablePageAddNewContent from "../../ReusablePageAddNewContent/ReusablePageAddNewContent";
import TabsAir from "./TabsAir/TabsAir";
import { useTranslation } from "react-i18next";
import { Navigate, useSearchParams } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";

const AddNewAirlineTicketRequests: React.FC = () => {
    const { t } = useTranslation("orders");
    const [searchParams] = useSearchParams();
    const employeeId = searchParams.get("employeeId");

    if (!employeeId) {
        return <Navigate to={FullRoutes.Dashboard.Orders.All + "?tab=5"} />;
    }
    return (
        <ReusablePageAddNewContent
            helmetPageTitle={t("airlineTicket.title")}
            titlePage={t("airlineTicket.title")}
        >
            <>
                <TabsAir employeeId={employeeId} />
            </>
        </ReusablePageAddNewContent>
    );
};

export default AddNewAirlineTicketRequests;
