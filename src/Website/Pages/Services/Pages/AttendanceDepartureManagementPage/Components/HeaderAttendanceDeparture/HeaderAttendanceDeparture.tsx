import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContentRightAttendanceDeparture from "./ContentRightAttendanceDeparture/ContentRightAttendanceDeparture";
import ContentLeftAttendanceDeparture from "./ContentLeftAttendanceDeparture/ContentLeftAttendanceDeparture";

const HeaderAttendanceDeparture = () => {
  return (
    <>
      <BannerLayout
        leftContent={<ContentRightAttendanceDeparture />}
        rightContent={<ContentLeftAttendanceDeparture />}
        className="banner-header-main-attenfance"
      />
    </>
  );
};

export default HeaderAttendanceDeparture;
