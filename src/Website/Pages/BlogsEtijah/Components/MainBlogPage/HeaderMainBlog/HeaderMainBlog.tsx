import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContnetRightMainBlog from "./ContnetRightMainBlog/ContnetRightMainBlog";
import ContentLeftMainBlog from "./ContentLeftMainBlog/ContentLeftMainBlog";
import "./HeaderMainBlog.css"
const HeaderMainBlog = () => {
  return (
    <>
      <BannerLayout
        leftContent={<ContnetRightMainBlog />}
        rightContent={<ContentLeftMainBlog />}
        className="banner-header-main-blog"
      />
    </>
  );
};

export default HeaderMainBlog;
