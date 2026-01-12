import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const DepartmentsPage = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(DepartmentsPage, "employees_setting");
