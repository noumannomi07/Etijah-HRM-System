import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import SideBarOutLayout from "@/Dashboard/Components/SidebarMenu/SideBarOutLayout";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import TabsPackagesProfileUser from "./Components/TabsPackagesProfileUser/TabsPackagesProfileUser";
import CurrentPackage from "./Components/TabsPackagesProfileUser/CurrentPackage";

const PackagesProfileUser = () => {
  return (
    <>
      {" "}
      <HelmetInfo titlePage={"الباقات"} />
      <div >
        
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
            titleTextPage={"الباقات"}
          />
          <ButtonBack
            isRouteDashboard={true}
            routeLink="home-dashboard"
            addNewRoute={false}
            isTextBack={true}
            AddNewTextButton={""}
          />
        </header>
        <main>
        <CurrentPackage />
          {/* <TabsPackagesProfileUser /> */}
        </main>
      </div>
    </>
  );
};

export default PackagesProfileUser;
