import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const NationalitiesManagementsPage = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default withPermissions(NationalitiesManagementsPage, "employees_setting");
