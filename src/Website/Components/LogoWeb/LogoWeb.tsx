import logoText from "@assets/images/logo/logotext.svg";
import { Link } from "react-router-dom";
import "./LogoWeb.css"
import { FullRoutes } from "@/Routes/routes";

const LogoWeb = () => {
  return (
    <>
      {/* ================== START LOGO WEB =================== */}
      <Link to={FullRoutes.Website.Base} className="logo-web">
        <img
          src={logoText}
          alt="logo"
          loading="lazy"
          width={"118px"}
          height={"67px"}

        />
      </Link>
      {/* ================== END LOGO WEB =================== */}
    </>
  );
};

export default LogoWeb;
