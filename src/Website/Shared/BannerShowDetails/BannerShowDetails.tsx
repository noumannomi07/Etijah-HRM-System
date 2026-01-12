import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import InfoSection from "../BannerLayout/InfoSection";
import "./BannerShowDetails.css";
import PropTypes from "prop-types";
const BannerShowDetails = ({
  isBgLightBlue,
  title,
  textDiscription,
  imgBannerShow,
  altImage
}) => {
  return (
    <div
      className={`banner-show-details-card  ${
        isBgLightBlue ? "banner-bg-light-blue" : ""
      } `}
    >
      {/* ================= START CONTAINER =================== */}
      <ContainerMedia>
        {/* =============== START ALL BANNER SHOW DETAILS =============== */}
        <div className="all-banner-show-details items-center  grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-6 overflow-hidden">
          {/* ================ START BANNER SHOW CONTENT ================ */}
          <div data-aos="fade-left" className="banner-show-content col-span-1 md:col-span-3">
            <InfoSection
              newClassInfoSection={"info-banner-show"}
              title={title}
              description={textDiscription}
              hideButtonSendRequest={false}
            />
          </div>
          {/* ================ END BANNER SHOW CONTENT ================ */}

          {/* =============== START IMAGE BANNER SHOW DETAILS ==============*/}
          <div data-aos="fade-right" className="image-banner-show-details relative transform translate-y-[15px] col-span-1  md:col-span-3">
            <img
              src={imgBannerShow}
              alt={altImage}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* =============== END IMAGE BANNER SHOW DETAILS ==============*/}
        </div>
        {/* =============== END ALL BANNER SHOW DETAILS =============== */}
      </ContainerMedia>
      {/* ================= END CONTAINER =================== */}
    </div>
  );
};
BannerShowDetails.propTypes = {
  isBgLightBlue: PropTypes.bool,
  title: PropTypes.string.isRequired,
  textDiscription: PropTypes.string.isRequired,
  imgBannerShow: PropTypes.string.isRequired,
  altImage: PropTypes.string
};

export default BannerShowDetails;
