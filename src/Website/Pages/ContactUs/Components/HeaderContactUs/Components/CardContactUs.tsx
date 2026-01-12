import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const CardContactUs = ({
  newClassCard,
  hrefLink,
  iconContact,
  titleInfoContact,
  hideText,
  textInfoContact,
  hideArrow
}) => {
  return (
    <a
      href={hrefLink}
      target="_blank"
      className={` card-contact-one border-[0.1px] border-[#ffffff30] p-[16px] rounded-[16px] ${newClassCard}`}
    >
      {/* =============== START ICON CONTACT ================= */}
      <div className="icon-contact">
        <img
          src={iconContact}
          alt="icon"
          width={"41px"}
          height={"41px"}
          className="icon-info-src object-cover"
          loading="lazy"
        />
      </div>
      {/* =============== END ICON CONTACT ================= */}
      <div className="main-details-contact-card flex justify-between items-center mt-4">
        {/* =============== START DETAILS CONTACT ============ */}
        <div className="details-contct-card">
          <h2 className="title-contact text-font-white">{titleInfoContact}</h2>
          {!hideText && (
            <p className="info-contact-text text-font-white mt-1">
              {textInfoContact}
            </p>
          )}
        </div>
        {/* =============== END DETAILS CONTACT ============ */}
        {!hideArrow && (
          <div className="icon-arrow-contact transform rotate-[40deg]">
            <FontAwesomeIcon icon={faLongArrowLeft} />
          </div>
        )}
      </div>
    </a>
  );
};
CardContactUs.propTypes = {
  newClassCard: PropTypes.string,
  hrefLink: PropTypes.string.isRequired,
  iconContact: PropTypes.string.isRequired,
  titleInfoContact: PropTypes.string.isRequired,
  textInfoContact: PropTypes.string.isRequired,
  hideText: PropTypes.bool,
  hideArrow: PropTypes.bool
};

export default CardContactUs;
