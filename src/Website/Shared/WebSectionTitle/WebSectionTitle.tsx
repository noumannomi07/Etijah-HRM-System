import PropTypes from "prop-types";
import "./WebSectionTitle.css";
const WebSectionTitle = ({
  dataAos,
  newClassTitleSection,
  isTrueReverseCol,
  ishideText,
  textTitleHead="",
  titleWebSection=""
}) => {
  return (
    <div
    data-aos={dataAos}
      className={`web-section-title text-center mb-[45px] mx-auto ${newClassTitleSection} ${
        isTrueReverseCol
          ? "flex flex-col-reverse justify-center items-center sm:justify-start  sm:items-start"
          : ""
      } `}
    >
      {!ishideText && <p
        className={`head-title-section text-font-dark text-primaryColor_01  ${
          isTrueReverseCol ? "!text-darkColor" : ""
        }`}
      >
        {textTitleHead}
      </p>}
      <h2
        className={`title-web-section text-font-dark text-[23px] sm:text-[35px] font-[700]`}
      >
        {titleWebSection}
      </h2>
    </div>
  );
};

WebSectionTitle.propTypes = {
  dataAos: PropTypes.string,
  newClassTitleSection: PropTypes.string,
  isTrueReverseCol: PropTypes.bool,
  ishideText: PropTypes.bool,
  textTitleHead: PropTypes.string.isRequired,
  titleWebSection: PropTypes.string.isRequired
};
export default WebSectionTitle;
