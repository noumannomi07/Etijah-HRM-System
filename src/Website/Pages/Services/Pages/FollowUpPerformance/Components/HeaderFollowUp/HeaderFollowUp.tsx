import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContentRightFollowUp from "./ContentRightFollowUp/ContentRightFollowUp";
import ContentLeftFollowUp from "./ContentLeftFollowUp/ContentLeftFollowUp";

const HeaderFollowUp = () => {
  return (
    <>
      <BannerLayout
        leftContent={<ContentRightFollowUp />}
        rightContent={<ContentLeftFollowUp />}
        className="banner-header-main-follow"
      />
    </>
  );
};

export default HeaderFollowUp;
