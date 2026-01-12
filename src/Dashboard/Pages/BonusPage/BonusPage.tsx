import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const BonusPage = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default withPermissions(BonusPage, "rewards");
