import { FullRoutes } from "@/Routes/routes";
import Logo from "@components/Logo/Logo";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeaderLogin = ({ title, text, onBack }) => {
  return (
    <div className="header-info-auth-page flex flex-col gap-3 w-full mb-3">
      <Link to={FullRoutes.Website.Base}>
        {" "}
        <Logo />
      </Link>
      <div className="button-home">
        <div
          onClick={() => {
            onBack();
          }}
          className="button-transparent"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <div>
        <h2 className="title-top text-font-dark text-[20px] sm:text-[22px]">
          {title}{" "}
        </h2>
        <p className="text-auth text-font-gray text-[16px] sm:text-[18px] pt-1">
          {text}
        </p>
      </div>
    </div>
  );
};

HeaderLogin.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};
export default HeaderLogin;
