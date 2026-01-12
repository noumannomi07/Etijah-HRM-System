import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import ContentProfileUser from "./Components/ContentProfileUser/ContentProfileUser";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import SideBarOutLayout from "@/Dashboard/Components/SidebarMenu/SideBarOutLayout";

const ProfileUser = () => {
  return (
    <>
      <HelmetInfo titlePage={"الملف الشخصي"} />
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
            titleTextPage={"الملف الشخصي"}
          />
        </header>
        <main>
          <ContentProfileUser />
        </main>
      </div>
    </>
  );
};

export default ProfileUser;
