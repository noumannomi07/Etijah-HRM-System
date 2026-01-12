import TimeIcon from "@assets/images/sidebaricons/timeicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import FormAddShift from "./FormAddShift";
import { FullRoutes } from "@/Routes/routes";

const AddShiftSchedule = () => {
  return (
    <>
      <HelmetInfo titlePage={"إضافة جدول العمل"} />

      <BreadcrumbsDefault
        isShowTitleHomePage={false}
        isShowSlashHome={false}
        isDashboardRouteHomePage={false}
        isShowNewLinkPage={true}
        routeOfNewLinkPage={FullRoutes.Dashboard.ShiftSchedule.All}
        iconNewPageText={<img src={TimeIcon} alt="time" />}
        textNewPage={"جدول العمل"}
        isPageDefault={false}
        defaultPageRoute={false}
        textDefaultPage={false}
        isShowTitleTextPage={true}
        titleTextPage={"إضافة جدول العمل"}
      />
      {/* ==================== START HEADER PAGE REQUEST =================== */}
      <header>
        <div className="header-page-request">
          <ButtonBack
            isRouteDashboard={true}
            routeLink="shift-schedule"
            addNewRoute={false}
            isTextBack={true}
            AddNewTextButton={""}
          />
        </div>
      </header>
      {/* ==================== END HEADER PAGE REQUEST =================== */}
      <main data-aos="fade-up">
        <FormAddShift />
      </main>
    </>
  );
};

export default AddShiftSchedule;
