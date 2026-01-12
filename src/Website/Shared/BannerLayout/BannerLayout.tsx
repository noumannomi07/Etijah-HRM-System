import BannerBgWeb from "../BannerBgWeb/BannerBgWeb";
import PropTypes from "prop-types";
import "./BannerLayout.css";
const BannerLayout = ({ leftContent, rightContent, className = "" }) => {
  return (
    <div className={`banner-main-layout  relative ${className}`}>
      <BannerBgWeb>
        {/* =================== START ALL CONTENT SUBSCRIPTION =================== */}
        <div className="all-content-banner-layout grid grid-cols-1 md:grid-cols-8 gap-[35px] items-center">
          <div className="col-left-class col-span-1 md:col-span-4">{leftContent}</div>
          <div className="col-right-class col-span-1 md:col-span-4">{rightContent}</div>
        </div>
        {/* =================== END ALL CONTENT SUBSCRIPTION =================== */}
      </BannerBgWeb>
    </div>
  );
};
BannerLayout.propTypes = {
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node.isRequired,
  className: PropTypes.string
};


export default BannerLayout;
