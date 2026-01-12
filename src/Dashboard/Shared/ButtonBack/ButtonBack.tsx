import DirectionLeftIcon from "@/assets/images/taskspageicons/directionlefticon";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";

interface ButtonBackProps {
  isRouteDashboard?: boolean;
  routeLink: string;
  addNewRoute?: string;
  isTextBack?: boolean;
  AddNewTextButton?: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({
  isRouteDashboard,
  routeLink,
  addNewRoute,
  isTextBack,
  AddNewTextButton = ""
}) => {
  const { t } = useTranslation("main");
  return (
    <Link
      data-aos="fade-left"
      to={isRouteDashboard ? `/dashboard/${routeLink}` : addNewRoute || ""}
      className="button-transparent button-hover-svg font-[600] gap-[5px]"
    >
      <DirectionLeftIcon /> {isTextBack ? t("Back") : AddNewTextButton}
    </Link>
  );
};

ButtonBack.propTypes = {
  isRouteDashboard: PropTypes.bool,
  routeLink: PropTypes.string.isRequired,
  addNewRoute: PropTypes.string,
  isTextBack: PropTypes.bool,
  AddNewTextButton: PropTypes.string
};

export default ButtonBack;
