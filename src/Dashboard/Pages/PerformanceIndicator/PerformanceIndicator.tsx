import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const PerformanceIndicator = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(PerformanceIndicator, "performance");
