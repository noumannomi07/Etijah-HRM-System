import React from "react";
import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const SalaryAdjustments = () => {
    return <Outlet />;
};

export default withPermissions(SalaryAdjustments, "salary_adjustments");
