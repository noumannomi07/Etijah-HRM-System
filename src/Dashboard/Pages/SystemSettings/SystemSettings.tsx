import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const SystemSettings = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(SystemSettings, "settings");
