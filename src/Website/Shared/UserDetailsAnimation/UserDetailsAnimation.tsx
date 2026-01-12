import shareIconLeft from "@assets/images/website/icons/shareiconleft.svg";
import shareIconRight from "@assets/images/website/icons/shareiconright.svg";
import PropTypes from "prop-types";
import "./UserDetailsAnimation.css";
const UserDetailsAnimation = ({
  dataAos = "",
  isRightTrue,
  imageUser,
  isLeftShareIcon,
  isRightShareIcon,
  isBgBlueContent,
  userName = "",
  titleJob = ""
}) => {
  return (
    <>
      {/* ================== START USER DETAILS ANIMATION =================== */}
      <div
        data-aos={dataAos}
        className={`user-one-details-animation  absolute top-[13%]   z-[1100] ${isRightTrue
            ? "user-one-details-animation-right right-[10%]"
            : "left-[20%]"
          }`}
      >
        {/* ================= START ANIMATION BG PLUS =================== */}
        <div className="animation-bg-plus">
          {/* ====================== START IMAGE USER ==================== */}
          <div className="image-user">
            <img
              src={imageUser}
              alt="image user"
              className=" object-cover w-[80px] h-[80px] rounded-[50%]"
              loading="lazy"
            />
          </div>
          {/* ====================== END IMAGE USER ==================== */}
          {/* ====================== START ICON USER ==================== */}
          <div className="share-icon-user">
            {isLeftShareIcon && <img src={shareIconLeft} alt="share icon" />}
            {isRightShareIcon && <img src={shareIconRight} alt="share icon" />}
          </div>
          {/* ====================== END ICON USER ==================== */}
          {/* ====================== START CONTENT USER ANIMATION ==================== */}
          <div
            className={`content-user-animation text-start ${isBgBlueContent ? "!bg-primaryColor_01" : ""
              } ${userName.trim().length < 9 ? "is-6-letters" : "short-name"} ${userName.trim().length > 19
                ? "full-name"
                : userName.trim().length <= 15
                  ? ""
                  : "is-16-letters"
              } ${userName.trim().length >= 24 ? "plus-24-letters" : ""} `}
          >
            <h2 className="title-user-anim text-font-white text-[15px]">
              {userName}
            </h2>
            <p className="text-title-anim text-font-white text-[12px]">
              {titleJob}
            </p>
          </div>
          {/* ====================== END CONTENT USER ANIMATION ==================== */}
        </div>
        {/* ================= END ANIMATION BG PLUS =================== */}
      </div>
      {/* ================== END USER DETAILS ANIMATION =================== */}
    </>
  );
};

UserDetailsAnimation.propTypes = {
  dataAos: PropTypes.string,
  isRightTrue: PropTypes.bool,
  imageUser: PropTypes.string.isRequired,
  isLeftShareIcon: PropTypes.bool,
  isRightShareIcon: PropTypes.bool,
  isBgBlueContent: PropTypes.bool,
  userName: PropTypes.string,
  titleJob: PropTypes.string.isRequired
};

export default UserDetailsAnimation;
