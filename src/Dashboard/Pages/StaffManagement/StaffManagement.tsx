import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withPermissions } from "@/hoc";

const StaffManagement = () => {
    const { t } = useTranslation("staffManagement");

    return (
        <>
            <HelmetInfo titlePage={t("pageTitle.staffManagement")} />
            <div className="staff-managment">
                <Outlet />
            </div>
        </>
    );
};

export default withPermissions(StaffManagement, "employees");
