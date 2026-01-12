import BellBgIcon from "@assets/images/navbaricons/bellbgicon.svg";
import PropTypes from "prop-types";
const NotificationsCard = ({
  isNewNotification,
  timeDate,
  titleNotification,
  textBottomInfo
}) => {
  return (
    <div className="notification-card item-center-flex relative border-b py-[15px]">
      {isNewNotification && (
        <span className="notification-success w-[10px] h-[10px]  bg-greenColor01 rounded-[50px] absolute left-[0px] top-[10px]"></span>
      )}
      {/* ============== START ICON CARD =============== */}
      <div className="icon-card !p-[11px] sm:!p-[13px] flex-items-center   bg-primaryLightColor rounded-[12px]">
        <img src={BellBgIcon} alt="notification" />
      </div>
      {/* ============== END ICON CARD =============== */}
      {/* ============== START CONTENT CARD NOTIFICATION ================ */}
      <div className="content-card-notification">
        <p className="date-text text-font-gray">{timeDate}</p>
        <h2 className="title text-font-dark text-[13px] sm:text-[15px] ">
          {titleNotification}
        </h2>
        <p className="text text-font-gray">
          {`${textBottomInfo}`.split(" ")}
        </p>
      </div>
      {/* ============== END CONTENT CARD NOTIFICATION ================ */}
    </div>
  );
};

NotificationsCard.propTypes = {
  isNewNotification: PropTypes.bool.isRequired,
  timeDate: PropTypes.string.isRequired,
  titleNotification: PropTypes.string.isRequired,
  textBottomInfo: PropTypes.string.isRequired
};

export default NotificationsCard;
