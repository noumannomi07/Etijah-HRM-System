import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const FileCategoryPage = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(FileCategoryPage, "employees_setting");
