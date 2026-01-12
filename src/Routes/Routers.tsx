import React from "react";
import { Route, Routes } from "react-router-dom";
import { RelativeRoutes } from "./routes";
import { NotFoundPage } from "@/components";
import WebsiteRoutes from "@/Routes/WebsiteRoutes";
import DashboardRoutes from "@/Routes/DashboardRoutes";

const RoutesConfig = () => {
    return (
        <Routes>
            {/* Website Routes */}
            <Route
                path={RelativeRoutes.Website.Base + "/*"}
                element={<WebsiteRoutes />}
            />

            {/* Dashboard Routes */}
            <Route
                path={RelativeRoutes.Dashboard.Base + "/*"}
                element={<DashboardRoutes />}
            />

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutesConfig;
