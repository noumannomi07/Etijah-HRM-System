import { useState, useEffect } from "react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import NotificationsCard from "./Components/NotificationsCard/NotificationsCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FullRoutes } from "@/Routes/routes";
import axiosInstance from "@/utils/axios";

const ModalNotifications = ({ open, hiddenModal }) => {

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (open) {
      // Fetch notifications when the modal is open
      axiosInstance.get('/notifications')
        .then(response => {
          const { notifications, unread } = response.data;
          setNotifications(notifications || []); // Fallback to empty array if undefined
          setUnreadCount(unread);
        })
        .catch(error => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [open]); // Only fetch when the modal is open

  return (
    <CustomModal
      newClassModal={"w-full xl:!min-w-[42%] xl:!max-w-[42%]"}
      isOpen={open}
      handleOpen={hiddenModal}
      titleModal={`الإشعارات ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
    >
      <div className="main-notification">
        <div className="all-cards-notification scrollbarChange pl-3 mb-3 h-[250px] overflow-y-auto">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationsCard
                key={notification.id}
                isNewNotification={!notification.read_at}
                timeDate={new Date(notification.created_at).toLocaleString("en-US")}
                titleNotification={notification.data.title}
                textBottomInfo={notification.data.content}
              />
            ))
          ) : (
            <p>لا توجد إشعارات حالياً</p> // Display message if there are no notifications
          )}
        </div>

        <Link 
          to={FullRoutes.Dashboard.Notifications} 
          className="btn-main"
          onClick={hiddenModal}
        >
          الجميع
        </Link>
      </div>
    </CustomModal>
  );
};

export default ModalNotifications;

ModalNotifications.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired
};






