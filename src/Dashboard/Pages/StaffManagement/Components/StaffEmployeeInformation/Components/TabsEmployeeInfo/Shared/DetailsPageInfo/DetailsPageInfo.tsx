import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import PropTypes from "prop-types";
import { CommonRouteKeys, FullRoutes, RelativeRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import React from "react";

interface DetailsPageInfoProps {
  titleHelmet: string;
  titlePage: string;
}

const DetailsPageInfo: React.FC<DetailsPageInfoProps> = ({ titleHelmet, titlePage }) => {
  const { t } = useTranslation("staffManagement");

  return (
    <>
      <HelmetInfo titlePage={titleHelmet} />
      <div className="page-details">
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.StaffManagement.All}
          iconNewPageText={<img src={UsersIcon} alt="users" />}
          textNewPage={t("pageTitle.staffManagement")}
          isPageDefault={true}
          defaultePageRoute={false}
          textDefaultPage={t("pageTitle.employeeInformation")}
          isShowTitleTextPage={true}
          titleTextPage={titlePage}
        />
        <header>
          <div className="header-page-request">
            <ButtonBack
              isRouteDashboard={true}
              routeLink={
                RelativeRoutes.Dashboard.StaffManagement[CommonRouteKeys.Base]
              }
              addNewRoute={false}
              isTextBack={true}
              AddNewTextButton={""}
            />
          </div>
        </header>
      </div>
    </>
  );
};

DetailsPageInfo.propTypes = {
  titleHelmet: PropTypes.string.isRequired,
  titlePage: PropTypes.string.isRequired,
};

export default DetailsPageInfo;
