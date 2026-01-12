import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const JobTitlesPage = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(JobTitlesPage, "employees_setting");
