import PropTypes from "prop-types";

const SmallImageUser = ({ newClassImage, imageUser, altImage }) => {
  return (
    <img
      src={imageUser}
      className={`rounded-[50px] !w-[45px] !h-[45px] border border-lightColorWhite2 ${newClassImage}`}
      alt={altImage}
      loading="lazy"
    />
  );
};

SmallImageUser.propTypes = {
  newClassImage: PropTypes.string.isRequired,
  imageUser: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired
};

export default SmallImageUser;
