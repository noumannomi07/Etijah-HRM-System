import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import InfoContentAbout from "./InfoContentAbout";
import EtijahFeatures from "@/Website/Pages/Home/Components/EtijahFeatures/EtijahFeatures";
import "./HeaderAbout.css";
const HeaderAbout = () => {
  return (
    <div className="header-about-info">
      <BannerBgWeb>
        {/* =================== START ALL CONTENT SUBSCRIPTION =================== */}
        <div className="all-header-about ">
          <InfoContentAbout />
          <EtijahFeatures />
        </div>
        {/* =================== END ALL CONTENT SUBSCRIPTION =================== */}
      </BannerBgWeb>
    </div>
  );
};

export default HeaderAbout;
