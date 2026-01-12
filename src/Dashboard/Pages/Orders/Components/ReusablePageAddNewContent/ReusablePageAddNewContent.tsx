import React, { ReactNode } from "react";
import BreadCrumbRequestsPage from "./BreadCrumbRequestsPage/BreadCrumbRequestsPage";
import { Link } from "react-router-dom";
import DirectionLeftIcon from "@assets/Icons/DirectionLeftIcon.svg";
import PropTypes from "prop-types";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

interface ReusablePageAddNewContentProps {
  helmetPageTitle: string;
  titlePage: string;
  children: ReactNode;
}

const ReusablePageAddNewContent: React.FC<ReusablePageAddNewContentProps> = ({
  helmetPageTitle,
  titlePage,
  children
}) => {
  const { t } = useTranslation("orders");

  return (
    <>
      <HelmetInfo titlePage={helmetPageTitle} />
      <BreadCrumbRequestsPage titlePage={titlePage} />
      <div className="add-new-request-page">
        {/* ==================== START HEADER PAGE REQUEST =================== */}
        <header>
          <div className="header-page-request">
            <Link
              data-aos="fade-left"
              to={FullRoutes.Dashboard.Orders.All}
              className="button-transparent button-hover-svg font-[600] gap-[5px]"
            >
              <img src={DirectionLeftIcon} alt={t("altText.orderIcon")} />
              {t("buttons.back")}
            </Link>
          </div>
        </header>
        {/* ==================== END HEADER PAGE REQUEST =================== */}
        {/* ==================== START MAIN =================== */}
        <main>{children}</main>
        {/* ==================== END MAIN =================== */}
      </div>
    </>
  );
};
ReusablePageAddNewContent.propTypes = {
  helmetPageTitle: PropTypes.string.isRequired,
  titlePage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ReusablePageAddNewContent;
