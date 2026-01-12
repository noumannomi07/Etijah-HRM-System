import PropTypes from "prop-types";

const CardBoxDetails = ({
  isNumberTop,
  numberTop="",
  titleDetails,
  textDetails
}) => {
  return (
    <div className="card-box-details-add mb-3 card-border-content">
      {/* ================= START INFO DETIALS CONTENT ======================= */}
      <div className="info-details-content">
        {isNumberTop && (
          <h2 className="number-top-1 leading-[1] mb-2 text-font-dark text-[30px] font-[700]  sm:text-[40px]">
            {numberTop}
          </h2>
        )}
        <h2 className="title-details text-font-dark text-[16px] font-[700] sm:font-[600] sm:text-[22px] mb-2">
          {titleDetails}
        </h2>
        <p className="text-details text-font-dark text-[14px] sm:text-[17px] font-[500]">
          {textDetails}
        </p>
      </div>
      {/* ================= END INFO DETIALS CONTENT ======================= */}
    </div>
  );
};

CardBoxDetails.propTypes = {
  titleDetails: PropTypes.string.isRequired,
  textDetails: PropTypes.string.isRequired,
  isNumberTop: PropTypes.bool.isRequired,
  numberTop: PropTypes.string.isRequired
};
export default CardBoxDetails;
