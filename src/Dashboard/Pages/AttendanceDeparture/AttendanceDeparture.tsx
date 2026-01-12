import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import LoginIcon from "@assets/images/sidebaricons/loginicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import React from "react";
import TableAttendanceDeparture from "./Components/TableAttendanceDeparture/TableAttendanceDeparture";
import { withPermissions } from "@/hoc";

const AttendanceDeparture = () => {
  return (
    <>
      <HelmetInfo titlePage={"الحضور والإنصراف"} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.AttendanceDeparture}
          iconNewPageText={<img src={LoginIcon} alt="login" />}
          textNewPage={"الحضور والإنصراف"}
        />
      </header>

      <main>
        <TableAttendanceDeparture />
      </main>
    </>
  );
};

export default withPermissions(AttendanceDeparture, "attendance");
