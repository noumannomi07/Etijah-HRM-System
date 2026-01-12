import ArrowSend from "@assets/Icons/ArrowSend.svg";
import "./ButtonSendRequest.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const ButtonSendRequest = ({
  addNewClassButton = "",
  isTextSendReuestNow,
  addNewTextButton = "",
  isRoutePageSendRequest,
  newFunctionButtonSendRequest
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation('homePage');

  // CHECK HERE IF "NEW FUNCTION BUTTON" IS A VALID FUNCTION
  const handleButtonClick = () => {
    if (isRoutePageSendRequest) {
      navigate(FullRoutes.Website.SubmitSubscriptionRequestWeb); // Navigate to about page NAVIGATE TO "submitSubscriptionRequestWeb"
    } else if (typeof newFunctionButtonSendRequest === "function") {
      newFunctionButtonSendRequest(); // THIS FUNCTION WORK ON CLIKED BUTTON IS FALSE "IS ROUTE PAGE SEND"
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`button-send-request button-transparent bg-whiteColor hover:bg-orangeColor hover:border-orangeColor flex items-center gap-3 justify-center rounded-full p-[12px_30px] ${addNewClassButton}`}
    >
      {isTextSendReuestNow ? t('header.sendRequestNow') : addNewTextButton}
      <div className="icon-arrow-button rtl:!rotate-[50deg]  ltr:!rotate-[-220deg]">
      <FontAwesomeIcon icon={faLongArrowLeft} style={{width:"18px"}} />
      </div>
    </button>
  );
};

ButtonSendRequest.propTypes = {
  addNewClassButton: PropTypes.string,
  isTextSendReuestNow: PropTypes.bool.isRequired,
  addNewTextButton: PropTypes.string,
  isRoutePageSendRequest: PropTypes.bool,
  newFunctionButtonSendRequest: PropTypes.func
};

export default ButtonSendRequest;
