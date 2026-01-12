import PropTypes from "prop-types";
import DiamondIcon from "@assets/images/website/icons/diamondicon";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { FullRoutes } from "@/Routes/routes";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import React from "react";
import { useTranslation } from "react-i18next";

const PackageCardDetails = ({
  className,
  title,
  description,
  price,
  annualPrice,
  features,
  isBestseller,
  hideButtonSubscribe,
  children,
  isFeatured
}) => {
  const { t, i18n } = useTranslation('packages');
  const navigate = useNavigate(); // NAVIGATE TO PAGE ROUTE
  const [loader, setLoader] = useState(false); // USESTATE TO ADD LOADER
  const clikedButtonSubscribe = () => {
    // FUNCTION BUTTON TO ADD LOADER AND AFTER "1.2s" GO TO PAGE ROUTE
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(FullRoutes.Website.SubmitSubscriptionRequestWeb);
    }, 1200);
  };

  return (
    <div
      className={`package-card-details ${isBestseller ? 'bestseller-package bg-primaryColor_02' : 'bg-lightColorWhite'} border-lightColorWhite p-[24px_20px] rounded-[16px] flex flex-col h-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} ${className}`}
    >
      {/* ================== START MAIN INFO PACKAGE CARD ============== */}
      <div className="main-info-package-card flex-grow">
        {/* =================== START TOP PACKAGE DETAILS ================= */}
        <div className=" flex-between-wrap mb-5 relative">
          {/* ================= START ICON PACKAGE =============== */}
          {isBestseller && (
            <div className="badge-bestseller bg-orangeColor absolute left-0  rounded-[12px] p-[0.65rem_0.85rem] text-font-white text-[14px]  max-w-max">
              {t('ui.bestsellerBadge')}
            </div>
          )}
          <div className={`icon-package w-[45px] h-[45px] rounded-[12px] flex-items-center ${isBestseller ? 'bg-lightColorWhite' : ''}`}>
            <DiamondIcon />
          </div>
          {/* ================= END ICON PACKAGE =============== */}

        </div>
        {/* =================== END TOP PACKAGE DETAILS ================= */}

        {/* ================= START HEADER CARD PACKAGE =============== */}
        <div className="header-card-package">
          <h2 className={`title-package font-[700] mb-2 ${isBestseller ? 'text-white' : 'text-font-dark'}`}>
            {title}
          </h2>
          <p className={`text-package text-[15px] font-[500] mb-2 ${isBestseller ? 'text-white' : 'text-font-dark'}`}>
            {description}
          </p>
          {isFeatured === 1 && (
            <>
                <div className={`price-package text-[14px] item-center-flex gap-1 ${isBestseller ? 'text-white' : 'text-font-dark'}`}>
            <p className="price-info text-[22px] font-[700] flex items-center">
              {price}
            </p>
            <span className="currency-icon"><Saudiriyal fill={`${isBestseller ? '#fff' : '#000'}`} /></span>/{t('ui.perMonth')}
          </div>
          <div className={`price-package text-[14px] item-center-flex gap-1 ${isBestseller ? 'text-white' : 'text-font-dark'}`}>
            <p className="price-info text-[22px] font-[700] flex items-center">
              {annualPrice}
            </p>
            <span className="currency-icon"><Saudiriyal fill={`${isBestseller ? '#fff' : '#000'}`} /></span>/{t('ui.annual')}
          </div>
            </>
          )}
      
        </div>
        {/* ================= END HEADER CARD PACKAGE =============== */}
        {/* ================= START DETAILS CARD PACKAGE ============== */}
        <div className={`details-card-package border-t pt-3 mt-3 ${isBestseller ? 'border-white/30' : ''}`}>
          <ul className="list-details-package p-0 m-0 item-center-flex flex-col gap-3 items-start">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`li-item-package font-[500] item-center-flex ${isBestseller ? 'text-white' : 'text-font-dark'}`}
              >
                <span className={`icon-check-package text-[16px] sm:text-[20px] ${isBestseller ? 'text-white' : 'text-primaryColor_02'}`}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {/* ================= END DETAILS CARD PACKAGE ============== */}
      </div>
      {/* ================= BUTTON AT THE BOTTOM ============== */}
      {!hideButtonSubscribe && (
        <div className="mt-auto button-package-Subscribe pt-6">
          <button
            onClick={clikedButtonSubscribe}
            className={`${isBestseller
                ? 'bg-lightColorWhite text-primaryColor_02 border-lightColorWhite hover:!bg-orangeColor hover:!text-whiteColor'
                : 'btn-blue-01'
              } rounded-[12px] w-full h-[50px] transition-all duration-500 hover:!border-orangeColor
    flex items-center justify-center`} // <- added flex centering
          >
            {loader ? <SpinnerLoader /> : t('ui.subscribeNow')}
          </button>

        </div>
      )}

      {children}
    </div>
  );
};

PackageCardDetails.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isBestseller: PropTypes.bool,
  hideButtonSubscribe: PropTypes.bool,
  children: PropTypes.node
};

export default PackageCardDetails;
