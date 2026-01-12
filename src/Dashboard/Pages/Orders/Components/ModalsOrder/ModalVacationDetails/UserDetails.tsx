import PropTypes from "prop-types";

const UserDetails = ({ image, nameUser }) => {
  return (
    <>
      {/* ================== START USER INFO DETAILS =============== */}
      <div className="user-info-details item-center-flex">
        {/* ================= START IMAGE USER ============= */}
        <div className="image-user  ">
          <img
            src={image}
            alt="image user"
            className="w-[42px] h-[42px] object-cover rounded-[50px]"
            loading="lazy"
          />
        </div>
        {/* ================= END IMAGE USER ============= */}
        <h2 className="title-name text-[15px] text-font-dark">{nameUser}</h2>
      </div>
      {/* ================== END USER INFO DETAILS =============== */}
    </>
  );
};

UserDetails.propTypes = {
  image: PropTypes.string.isRequired,
  nameUser: PropTypes.string.isRequired
};
export default UserDetails;
