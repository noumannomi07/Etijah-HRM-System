import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import ContentHeaderPackages from "./ContentHeaderPackages";

const HeaderPackages = () => {
  return (
    <div className="header-packeges">
      <BannerBgWeb>
        {/* =================== START ALL CONTENT PACKAGES =================== */}
        <div className="all-header-pakages">
          <ContentHeaderPackages />
        </div>
        {/* =================== END ALL CONTENT PACKAGES =================== */}
      </BannerBgWeb>
    </div>
  );
};

export default HeaderPackages;
