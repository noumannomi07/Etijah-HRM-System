import ContentNotifications from "./Components/ContentNotifications/ContentNotifications";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { withPermissions } from "@/hoc";
import { useTranslation } from "react-i18next";

const NotificationsPage = () => {
    const { t } = useTranslation('notifications');
    
    return (
        <>
            <HelmetInfo titlePage={t('pageTitle')} />
            <div>
                <ContentNotifications />
            </div>
        </>
    );
};

export default withPermissions(NotificationsPage, "notifications");
