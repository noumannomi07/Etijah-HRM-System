import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContentRightOrderManagement from "./ContentRightOrderManagement/ContentRightOrderManagement";
import ContentLeftOrderManagement from "./ContentLeftOrderManagement/ContentLeftOrderManagement";

const HeaderOrderManagement = () => {
  return (
    <BannerLayout
      leftContent={<ContentRightOrderManagement />}
      rightContent={<ContentLeftOrderManagement />}
      className="banner-header-main-follow"
    />
  );
};

export default HeaderOrderManagement;
