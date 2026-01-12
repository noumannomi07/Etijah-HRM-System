import React from "react";
import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const Employment = () => {
    return <Outlet />;
};

export default withPermissions(Employment, "applicants");
