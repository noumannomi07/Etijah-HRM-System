import ArrowSend from "@assets/Icons/ArrowSend.svg";

import "./CardBoxOneShared.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CardBoxOneShared = ({
  functionCardBox,
  iconHeaderBox,
  titleContentCard,
  textContentCard,
  children
}) => {
  return (
    <>
      {/* ================= START CARD BOX ONE ================ */}
      <div
        onClick={functionCardBox}
        className="card-box-one-shared h-full cursor-pointer border border-lightColorWhite2   p-[24px_12px] sm:p-[24px] rounded-[16px] group transition-all duration-700 hover:bg-primaryColor_01"
      >
        {/* ==================== START ICON CARD ================ */}
        <div className="icon-card-box mb-3">{iconHeaderBox}</div>
        {/* ==================== END ICON CARD ================ */}
        {/* ==================== START CONTENT CARD BOX ================ */}
        <div className="content-card-box-shared">
          <h2 className="title mt-2 transition-all duration-700 group-hover:text-whiteColor text-font-dark text-[18px]">
            {titleContentCard}
          </h2>
          <div className="main-text flex-between mt-2">
            <p className="text transition-all max-w-full sm:max-w-[550px] w-full duration-700 text-font-dark text-[13px] sm:text-[15px] group-hover:text-whiteColor leading-[1.8]">
              {textContentCard}
            </p>
            <div className="icon-arrow-send cursor-pointer  rtl:!rotate-[50deg]  ltr:!rotate-[-220deg]">
          <FontAwesomeIcon icon={faLongArrowLeft} style={{width:"18px"}} />
            </div>
          </div>
        </div>
        {/* ==================== END CONTENT CARD BOX ================ */}
        {children}
      </div>
      {/* ================= END CARD BOX ONE ================ */}
    </>
  );
};

CardBoxOneShared.propTypes = {
  functionCardBox: PropTypes.func.isRequired,
  iconHeaderBox: PropTypes.node,
  titleContentCard: PropTypes.string.isRequired,
  textContentCard: PropTypes.string.isRequired,
  children: PropTypes.node
};
export default CardBoxOneShared;
