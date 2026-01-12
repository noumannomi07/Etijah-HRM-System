import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";
const AosAnimation = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 950,
      easing: "ease-in-out",
      once: true,
    });
    window.addEventListener("load", AOS.refresh);
  }, []);
  return <>{children}</>;
};
AosAnimation.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AosAnimation;
