import PropTypes from "prop-types";
import "./CheckButtonGroup.css"
const CheckButtonGroup = ({ options, selected, onChange }) => {
  const handleRadioChange = (value) => {
    onChange(value);
  };

  return (
    <div className="all-info-buttons-check flex gap-3  flex-wrap">
      {options.map((option) => (
        <label
          key={option}
          className={`lable-button-cheked item-center-flex  gap-[8px] text-[14px] text-font-gray cursor-pointer border rounded-lg max-w-fit p-[10px_17px] ${
            selected === option
              ? "border-primaryColor bg-lightColorblue text-primaryColor"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="options"
            value={option}
            checked={selected === option}
            onChange={() => handleRadioChange(option)}
            className="hidden"
          />

          <span
            className={`flex items-center justify-center w-5 h-5 border rounded-full ${
              selected === option
                ? "border-primaryColor bg-primaryColor"
                : "border-gray-300"
            }`}
          >
            {selected === option && (
              <span className="w-2 h-2 bg-whiteColor rounded-full" />
            )}
          </span>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

CheckButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckButtonGroup;
