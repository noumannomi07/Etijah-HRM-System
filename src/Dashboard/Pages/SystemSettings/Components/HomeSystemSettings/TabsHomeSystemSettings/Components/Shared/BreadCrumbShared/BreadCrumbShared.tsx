import SettingsIcon from '@assets/images/sidebaricons/settingsicon.svg'
import { BreadcrumbsDefault } from '@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault'
import PropTypes from 'prop-types';
import { FullRoutes } from '@/Routes/routes';
import { useTranslation } from 'react-i18next';

const BreadCrumbShared = ({ textPage }) => {
    const {t} =useTranslation("systemSettings")
    return (
        <BreadcrumbsDefault
            isShowTitleHomePage={false}
            isShowSlashHome={false}
            isDashboardRouteHomePage={false}
            isShowNewLinkPage={true}
            routeOfNewLinkPage={FullRoutes.Dashboard.SystemSettings.All}
            iconNewPageText={<img src={SettingsIcon} />}
            textNewPage={t("pageTitle.systemSettings")}
            isPageDefault={false}
            defaultPageRoute={false}
            textDefaultPage={false}
            isShowTitleTextPage={true}
            titleTextPage={textPage}
        />
    )
}
BreadCrumbShared.propTypes = {
    textPage: PropTypes.string.isRequired,
};
export default BreadCrumbShared