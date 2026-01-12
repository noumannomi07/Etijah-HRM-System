import TableDepartments from "./TableDepartments/TableDepartments";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

const HomeDepartments = () => {
  return (
    <>
      <HelmetInfo titlePage={"الأقسام"} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={true}
          isShowSlashHome={true}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Departments.All}
          iconNewPageText={<img src={GridIcon2} alt="grid" />}
          textNewPage={"الأقسام"}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main data-aos="fade-up">
        <TableDepartments />
      </main>
    </>
  );
};

export default HomeDepartments;
