import { useState, useEffect } from "react";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { VerticalTabs } from "@/Dashboard/Shared/VerticalTabs/VerticalTabs";
import NotificationsData from "./NotificationsData";
import axiosInstance from "@/utils/axios"; // Assuming axiosInstance is set up in utils or elsewhere
import { useTranslation } from "react-i18next";

const ContentNotifications = () => {
  const { t } = useTranslation('notifications');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications when the page is loaded
    axiosInstance.get('/notifications')
      .then(response => {
        const { notifications, unread } = response.data;
        setNotifications(notifications || []); // Fallback to empty array if undefined
        setUnreadCount(unread);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const tabsData = [
    { label: t('tabs.all'), value: "all", desc: <NotificationsData notifications={notifications} filter="all" /> },
    { label: t('tabs.unread'), value: "2", desc: <NotificationsData notifications={notifications} filter="2" /> },
    { label: t('tabs.read'), value: "3", desc: <NotificationsData notifications={notifications} filter="3" /> }
  ];

  return (
    <>
      <BreadcrumbsDefault
        isShowTitleHomePage={true}
        isShowSlashHome={false}
        isDashboardRouteHomePage={true}
        isShowNewLinkPage={false}
        routeOfNewLinkPage={false}
        textNewPage={false}
        isPageDefault={false}
        defaultPageRoute={false}
        textDefaultPage={false}
        isShowTitleTextPage={true}
        titleTextPage={t('breadcrumb.notifications')}
      />

      <div className="all-content-notifications-page">
        <VerticalTabs tabsData={tabsData} />
      </div>
    </>
  );
};

export default ContentNotifications;
