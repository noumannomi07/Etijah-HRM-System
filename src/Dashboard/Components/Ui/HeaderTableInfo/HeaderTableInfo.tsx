import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./HeaderTableInfo.css";
import { useTranslation } from "react-i18next";
const HeaderTableInfo = ({
  titleHeader,
  isButtonAll,
  routePageInfo,
  textLink,
  buttonAddNewOrder,
  isButtonSystemSettings,
  functionButtonAddNewOrder,
  newButtonWithoutText,
  functionButtonNewButton,
  textButton,
  newComponentsHere,
  customButtonText
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="header-table-content flex-between-wrap pb-4 sm:pb-5">
        <h2 className="title text-font-dark">{titleHeader}</h2>
        <div className="main-top-header flex-between-wrap gap-4">
          {isButtonAll && (
            <Link
              to={routePageInfo}
              className="button-transparent flex items-center"
            >
              {textLink}{" "}
              <div className="icon-arrow-left transform translate-y-[2px]">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </Link>
          )}

          {buttonAddNewOrder && (
            <button
              className="btn-main p-[11px_22px]"
              onClick={functionButtonAddNewOrder}
            >
              {customButtonText || t("common.buttons.newOrder")} <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {isButtonSystemSettings && (
            <button
              className="btn-main p-[11px_22px]"
              onClick={functionButtonAddNewOrder}
            >
              {t("common.buttons.addNew")} <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {newButtonWithoutText && (
            <button
              className="btn-main p-[11px_22px]"
              onClick={functionButtonNewButton}
            >
              {textButton}
            </button>
          )}
          {newComponentsHere}
        </div>
      </div>
    </>
  );
};
HeaderTableInfo.propTypes = {
  titleHeader: PropTypes.string.isRequired,
  isButtonAll: PropTypes.bool,
  routePageInfo: PropTypes.string,
  textLink: PropTypes.node,
  buttonAddNewOrder: PropTypes.bool,
  isButtonSystemSettings: PropTypes.bool,
  functionButtonAddNewOrder: PropTypes.func,
  newButtonWithoutText: PropTypes.bool,
  functionButtonNewButton: PropTypes.func,
  textButton: PropTypes.string,
  newComponentsHere: PropTypes.node,
  customButtonText: PropTypes.string
};
export default HeaderTableInfo;
