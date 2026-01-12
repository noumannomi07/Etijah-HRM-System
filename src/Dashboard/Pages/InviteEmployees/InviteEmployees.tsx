import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import TableInviteEmployees from "./Components/TableInviteEmployees/TableInviteEmployees";
import SideBarOutLayout from "@/Dashboard/Components/SidebarMenu/SideBarOutLayout";

const InviteEmployees = () => {
  return (
    <>
      {" "}
      <HelmetInfo titlePage={"دعوة الموظفين"} />
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
            titleTextPage={"دعوة الموظفين"}
          />

          <ButtonBack
            isRouteDashboard={true}
            routeLink="home-dashboard"
            addNewRoute={false}
            isTextBack={true}
            AddNewTextButton={""}
          />
        </header>
        <main data-aos="fade-up">
          <TableInviteEmployees />
        </main>
      </div>
    </>
  ); 
};

export default InviteEmployees;
