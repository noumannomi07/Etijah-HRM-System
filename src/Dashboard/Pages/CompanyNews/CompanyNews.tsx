import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const CompanyNews = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(CompanyNews, "company_news");
