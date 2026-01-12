import { useEffect, useState } from "react";
import NotificationsCard from "@/Dashboard/Components/ModalNotifications/Components/NotificationsCard/NotificationsCard";
import axiosInstance from "@/utils/axios"; // Assuming axiosInstance is set up in utils or elsewhere
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";
import { useTranslation } from "react-i18next";

const NotificationsData = ({ notifications, filter = "all" }) => {
  const { i18n } = useTranslation('notifications');
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  useEffect(() => {
    // Filter notifications based on the selected filter
    if (filter === "all") {
      setFilteredNotifications(notifications);
    } else if (filter === "2") {
      // Filter unread notifications
      setFilteredNotifications(notifications.filter(notification => !notification.read_at));
    } else if (filter === "3") {
      // Filter read notifications
      setFilteredNotifications(notifications.filter(notification => notification.read_at));
    }
  }, [filter, notifications]);

  const dateLanguage = i18n.language === "ar" ? "ar-EG" : "en-US";

  return (
    <>
      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((notification) => (
          <NotificationsCard
            key={notification.id}
            isNewNotification={!notification.read_at}
            timeDate={new Date(notification.created_at).toLocaleString(dateLanguage)}
            titleNotification={notification.data.title}
            textBottomInfo={notification.data.content}
          />
        ))
      ) : (
        <NotDataFound />
      )}
    </>
  );
};

export default NotificationsData;
