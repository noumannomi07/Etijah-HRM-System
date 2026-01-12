import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";

const HeaderRangeCalc = () => {
  return (
    <div className="header-rang-calc">
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
          titleTextPage={"حاسبة النطاقات"}
        />

        <ButtonBack
          isRouteDashboard={true}
          routeLink="home-dashboard"
          addNewRoute={false}
          isTextBack={true}
          AddNewTextButton={""}
        />
      </header>
    </div>
  );
};

export default HeaderRangeCalc;
