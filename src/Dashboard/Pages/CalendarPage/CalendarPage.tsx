import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HomeCalendarPage from "./Components/HomeCalendarPage/HomeCalendarPage";
import { withPermissions } from "@/hoc";

const CalendarPage = () => {
  return (
    <>
      <HelmetInfo titlePage={"التقويم"} />

      <div >
        {/* <SideBarOutLayout /> */}

        <header>
          <BreadcrumbsDefault
            isShowTitleHomePage={true}
            isShowSlashHome={false}
            isDashboardRouteHomePage={true}
            isShowNewLinkPage={false}
            routeOfNewLinkPage={false}
            iconNewPageText={false}
            textNewPage={false}
            isPageDefault={false}
            defaultPageRoute={false}
            textDefaultPage={false}
            isShowTitleTextPage={true}
            titleTextPage={"التقويم"}
          />
        </header>
        <main>
          {/* <ButtonBack
            isRouteDashboard={true}
            routeLink="home-dashboard"
            addNewRoute={false}
            isTextBack={true}
            AddNewTextButton={false}
          /> */}
          <HomeCalendarPage />
        </main>
      </div>
    </>
  );
};

export default withPermissions(CalendarPage, "employees_setting");
