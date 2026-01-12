

import PropTypes from "prop-types";
import ButtonsActionCard from "./ButtonsActionCard";


const CardContentInfo = ({ image, date, title, content, onEdit, onDelete, idSwitchCard,onSwitch }) => {
  return (
    <div className="card-content-one border p-3 rounded-[12px]">
      {/* ================= START IMAGE CARD ==================== */}
      <div className="image-card">
        <img
          src={image}
          alt="image"
          className="w-full h-[200px] object-cover rounded-[12px]"
          loading="lazy"
        />
      </div>
      {/* ================= END IMAGE CARD ==================== */}
      {/* ================= START DETAILSCARD CONTENT =============== */}
      <div className="details-card-content pt-3">
        <div className="content-top flex-between mb-2">
          <p className="date-text text-font-gray text-[13px] sm:text-[15px]">
            {date}
          </p>
          <ButtonsActionCard onEdit={onEdit} onDelete={onDelete} idSwitchCard={idSwitchCard} onSwitch={onSwitch} />
        </div>
        <h2 className="title text-font-dark text-[13px] sm:text-[16px]">
          {title}
        </h2>
        <p className="text text-font-gray text-[13px] sm:text-[15px]">
          {content}
        </p>
      </div>
      {/* ================= END DETAILS CARD CONTENT =============== */}
    </div>
  );
};

CardContentInfo.propTypes = {
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  idSwitchCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  onSwitch: PropTypes.func.isRequired
};

export default CardContentInfo;
