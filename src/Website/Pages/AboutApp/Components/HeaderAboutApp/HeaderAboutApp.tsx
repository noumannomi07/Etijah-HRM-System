import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import ContentAboutApp from "./ContentAboutApp";
import "./HeaderAboutApp.css";

const HeaderAboutApp = () => {
  return (
    <div className="header-about-app">
      <BannerBgWeb>
        {/* =================== START ALL CONTENT SUBSCRIPTION =================== */}
        <div  className="all-header-about ">
          <ContentAboutApp />
        </div>
        {/* =================== END ALL CONTENT SUBSCRIPTION =================== */}
      </BannerBgWeb>
    </div>
  );
};

export default HeaderAboutApp;
