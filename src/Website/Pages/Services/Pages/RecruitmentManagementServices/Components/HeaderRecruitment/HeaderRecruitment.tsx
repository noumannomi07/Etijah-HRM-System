import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContentRightRecruitment from "./ContentRightRecruitment/ContentRightRecruitment";
import ContentLeftRecruitment from "./ContentLeftRecruitment/ContentLeftRecruitment";

const HeaderRecruitment = () => {
  return (

      <BannerLayout
        leftContent={<ContentRightRecruitment />}
        rightContent={<ContentLeftRecruitment />}
        className="banner-header-main-recruitment"
      />

  );
};

export default HeaderRecruitment;
