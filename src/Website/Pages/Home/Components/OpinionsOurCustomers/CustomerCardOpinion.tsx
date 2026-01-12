import StarCopyIcon from "@assets/images/website/icons/starcopyicon";
import PropTypes from "prop-types";
import React from "react";

const CustomerCardOpinion = ({
  newClassName,
  activeIndex,
  index,
  titleHeadReview,
  textDetails,
  imgUserBottom,
  altImageUserBottom,
  nameUser,
  titleJob,
  hideImagFullScreen,
  imageUserFull,
  imageAltUserFull
}) => {
  return (
    <>
      <div
        style={{
          display: activeIndex === index ? "grid" : "none"
        }}
        className={`customer-opinion-one grid-cards-2 bg-whiteColor ${newClassName}`}
      >
        {/* =================== START DETAILS REVIEW  ================= */}
        <div className="details-review-customer  flex flex-col justify-center items-center w-full border hover:border-primaryColor_01 transition-all duration-300 p-[25px_15px] sm:p-[35px_20px] rounded-[16px]">
          {/* =================== START HEADER REVIEW =============== */}
          <div className="header-review flex-between-wrap w-full">
            <h2 className="title-head-review text-font-dark text-[22px] sm:text-[28px] font-[700]">
              {titleHeadReview}
            </h2>
            <div className="icon-star-copy">
              <StarCopyIcon />
            </div>
          </div>
          {/* =================== END HEADER REVIEW =============== */}
          <p className="text-details-review leading-8 text-font-dark text-grayColor text-[14px] sm:text-[16px] p-[14px_0_20px_0]">
            {textDetails}
          </p>
          <div className={`custom-button-2 flex items-center gap-3 `}>
            <img
              src={imgUserBottom}
              className="w-[50px] h-[50px] object-cover rounded-full"
              alt={altImageUserBottom}
              loading="lazy"
            />{" "}
            <div className="content-detials-user">
              <h2 className="name-user text-font-dark text-[17px] text-start">
                {" "}
                {nameUser}
              </h2>
              <p className="title-job text-font-dark text-darkColor_02 text-[14px]">
                {" "}
                {titleJob}
              </p>
            </div>
          </div>
        </div>
        {/* =================== END DETAILS REVIEW  ================= */}
        {/* =================== START IMAGE ONE FILTER ================== */}
        {!hideImagFullScreen && (
          <div className="image-one-filter">
            <img
              src={imageUserFull}
              className="w-full h-[400px] rounded-[16px] object-cover object-top"
              alt={imageAltUserFull}
              loading="lazy"
            />
          </div>
        )}
        {/* =================== END IMAGE ONE FILTER ================== */}
      </div>
    </>
  );
};
CustomerCardOpinion.propTypes = {
  newClassName: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  titleHeadReview: PropTypes.string.isRequired,
  textDetails: PropTypes.string.isRequired,
  imgUserBottom: PropTypes.string.isRequired,
  altImageUserBottom: PropTypes.string.isRequired,
  nameUser: PropTypes.string.isRequired,
  titleJob: PropTypes.string.isRequired,
  hideImagFullScreen: PropTypes.bool.isRequired,
  imageUserFull: PropTypes.string,
  imageAltUserFull: PropTypes.string
};

export default CustomerCardOpinion;
