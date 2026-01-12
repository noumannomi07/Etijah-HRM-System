import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const RatingTab = ({ onRatingChange, reset, initialRating, disabled }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating || 0);

  // UPDATE SELECTED RATING WHEN INITIALRATING CHANGES
  useEffect(() => {
    if (initialRating) {
      setSelectedRating(initialRating);
    }
  }, [initialRating]);

  // RESET THE RATING IF RESET PROP CHANGES
  useEffect(() => {
    if (reset) {
      setSelectedRating(0); // RESET RATING TO 0
    }
  }, [reset]);

  // HANDLE CLICK ON A RATING AND PASS IT TO THE PARENT COMPONENT
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    onRatingChange(rating); // TRIGGER RATING CHANGE EVENT
  };

  // GET BACKGROUND COLOR BASED ON THE SELECTED RATING
  const getBackgroundColor = (index) => {
    if (selectedRating === index) {
      switch (index) {
        case 1:
          return "bg-red-500 border-red-500 text-white"; // COLOR FOR RATING "1" CLICKED
        case 2:
          return "bg-orange-500 border-orange-500 text-white"; // COLOR FOR RATING "2" CLICKED
        case 3:
          return "bg-[#CDD308] border-[#CDD308] text-white"; // COLOR FOR RATING "3" CLICKED
        case 4:
          return "bg-[#6DC778] border-[#6DC778] text-white"; // COLOR FOR RATING "4" CLICKED
        case 5:
          return "bg-green-500 border-green-500 text-white"; // COLOR FOR RATING "5" CLICKED
        default:
          return "bg-gray-200"; // DEFAULT BACKGROUND COLOR
      }
    }
    return "bg-white"; // DEFAULT BACKGROUND COLOR FOR UNSELECTED
  };

  return (
    <div className="all-rating item-center-flex flex-wrap mb-4">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          disabled={disabled}
          key={rating}
          onClick={() => handleRatingClick(rating)}
          className={`${getBackgroundColor(
            rating
          )} w-10 h-10 sm:w-12 sm:h-12 text-font-dark cursor-pointer flex items-center justify-center rounded-[8px] border border-gray-300`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

RatingTab.propTypes = {
  onRatingChange: PropTypes.func.isRequired,

  reset: PropTypes.bool.isRequired,

  initialRating: PropTypes.number,

  disabled: PropTypes.bool
};

export default RatingTab;
