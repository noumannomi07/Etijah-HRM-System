import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import "./BannerBgWeb.css";
import PropTypes from "prop-types";
const BannerBgWeb = ({ children }) => {
  return (
    <header>
      {/* =========== START BANNER AREA =========== */}
      <div className="banner-main-area-bg">
        {/* ========= START BANNER ONE ======== */}
        <div className="banner-one-area section-padding bg-image">
          {/* ======== START INFO BANNER ========= */}
          <div className="info-banner-area relative z-1">
            {/* ======= START CONTAINER =========== */}
            <ContainerMedia>
              {/* ========== START ALL HEADER INFO ========= */}
              <div className="all-header-info-content-area">{children}</div>
              {/* ========== END ALL HEADER INFO ========= */}
            </ContainerMedia>
            {/* ======== END CONTAINER =========== */}
          </div>
          {/* ======== END INFO BANNER ========== */}
        </div>
        {/* ======== END BANNER ONE ========= */}
      </div>
      {/* =========== END BANNER AREA =========== */}
    </header>
  );
};

BannerBgWeb.propTypes = {
  children: PropTypes.node.isRequired
};
export default BannerBgWeb;
