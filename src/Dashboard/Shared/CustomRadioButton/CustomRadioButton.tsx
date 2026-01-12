import PropTypes from "prop-types";
import "./CustomRadioButton.css";

const CustomRadioButton = ({ id, name, value, label, checked, onChange }) => {
  return (
    <label className="radio">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="radio-input hidden"
        checked={checked}
        onChange={onChange}
      />
      <span className="radio-label">{label}</span>
    </label>
  );
};

CustomRadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CustomRadioButton;
