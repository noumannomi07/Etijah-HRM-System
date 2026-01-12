import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import "./HeaderSingleBlog.css";
import { useTranslation } from "react-i18next";

const HeaderSingleBlog = () => {
  const { t } = useTranslation('blogs');
  
  return (
    <div className="header-single-blog">
      <BannerBgWeb>
        {/* =================== START ALL CONTENT PACKAGES =================== */}
        <div className="all-header-single">
          <header data-aos="fade-left">
            <BreadcrumbsDefault
              isShowTitleHomePage={true}
              isShowSlashHome={true}
              isDashboardRouteHomePage={false}
              isShowNewLinkPage={true}
              routeOfNewLinkPage={"/blogs-etijah"}
              iconNewPageText={false}
              textNewPage={t('singlePage.breadcrumb.blog')}
              isPageDefault={true}
              defaultPageRoute={false}
              textDefaultPage={t('singlePage.breadcrumb.blogDetails')}
              isShowTitleTextPage={false}
              titleTextPage={false}
            />
          </header>
        </div>
        {/* =================== END ALL CONTENT PACKAGES =================== */}
      </BannerBgWeb>
     
    </div>
  );
};

export default HeaderSingleBlog;
