import React from "react";
import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const SalaryMarches = () => {
  return (
    <Outlet />
  );
};

export default withPermissions(SalaryMarches, "payroll");
