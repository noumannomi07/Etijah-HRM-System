import PropTypes from "prop-types";

const CardPrivacy = ({ title, content }) => {
  return (
    <div className="card-privacy mb-4">
      <h2 className="title-privacy text-font-dark text-[15px] sm:text-[18px]">
        {title}
      </h2>
      {content.map((text, index) => (
        <p
          key={index}
          className="text-privacy text-font-dark  text-[13px] sm:text-[14px] leading-6 pt-2"
        >
          {text}
        </p>
      ))}
    </div>
  );
};
CardPrivacy.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CardPrivacy;
