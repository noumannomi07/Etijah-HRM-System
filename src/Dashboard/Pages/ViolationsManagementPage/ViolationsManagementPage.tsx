import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const ViolationsManagementPage = () => {
  return <Outlet />;
};

export default withPermissions(ViolationsManagementPage, "violations");
