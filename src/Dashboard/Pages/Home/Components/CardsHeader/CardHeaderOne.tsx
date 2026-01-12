import PropTypes from "prop-types";
import ArrowDown from "@assets/images/homeimages/iconscardheader/arrow_down.svg";
import ArrowTop from "@assets/images/homeimages/iconscardheader/arrow_top.svg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useTranslation } from "react-i18next";
const CardHeaderOne = ({
  icon,
  titleHead,
  numInfoCount,
  isUpPer,
  isDownPer,
  numPer,
  dateUpdate
}) => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({
    triggerOnce: true
  });
  return (
    <div className="card border bg-whiteColor p-[15px] rounded-[10px]  border-lightColorWhite2 w-[100%] transition-all duration-[0.5s] hover:border-primaryColor ">
      {/* ============== START HEADER CARD ============= */}
      <div className="header-card-top flex items-center gap-3">
        <figure>
          <img src={icon} alt="icon" width={"44px"} height={"44px"} loading="lazy" />
        </figure>
        <h2 className="title-head-text text-[16px] font-[500] text-darkColor ">
          {titleHead}
        </h2>
      </div>
      {/* ============== END HEADER CARD ============= */}
      {/* ============== START CARD BODY ============= */}
      <div className="card-body">
        <div className="middle-card py-3 flex items-center gap-[15px] flex-wrap justify-between">
          <div
            ref={ref}
            className="num-info text-[25px] font-[600] text-darkColor"
          >
            {inView && <CountUp end={numInfoCount} duration={2} />}
          </div>
          {isUpPer && (
            <div className="detials-per p-[4px_10px] rounded-[8px] bg-greenLightColor  text-greenColor01 text-[16px] font-[600]  flex items-center gap-[5px">
              <span className="num-info-per text-[16px]">{numPer}</span>{" "}
              <img src={ArrowTop} />
            </div>
          )}
          {isDownPer && (
            <div className="detials-per p-[4px_10px] rounded-[8px] bg-redLightColor  text-redColor01 text-[16px] font-[600]  flex items-center gap-[5px">
              <span className="num-info-per text-[16px]">{numPer}</span>{" "}
              <img src={ArrowDown} />
            </div>
          )}
        </div>
        <div className="bottom-info border-t border-lightColorWhite2 pt-3">
          <p className="text-bottom text-[14px] font-[500] text-grayColor">
            {t('dashboard.cards.lastUpdate')} : {dateUpdate}
          </p>
        </div>
      </div>
      {/* ============== END CARD BODY ============= */}
    </div>
  );
};
// PropTypes validation
CardHeaderOne.propTypes = {
  icon: PropTypes.string.isRequired,
  titleHead: PropTypes.string.isRequired,
  numInfoCount: PropTypes.number.isRequired,
  isUpPer: PropTypes.bool,
  isDownPer: PropTypes.bool,
  numPer: PropTypes.number,
  dateUpdate: PropTypes.string
};

export default CardHeaderOne;
