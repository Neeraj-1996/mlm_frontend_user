import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { fetchNotificationData } from "../Navigation/Allapi";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const handleBackClick = () => navigate(-1);
  
  useEffect(() => {
    resultDataOrder();
  }, []);

  const  resultDataOrder= async () => {
    try {
      const notificationData = await fetchNotificationData();
      setNotifications(notificationData);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to format the date and time
  const formatTime = (timeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timeString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="notifications-page">
      <Header name="Notification" onBack={handleBackClick} />
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              {/* Render Event Notifications */}
              {notification.type === "event" && (
                <>
                  {notification.eventImg && (
                    <img
                      src={notification.eventImg}
                      alt={notification.title}
                      className="event-image"
                    />
                  )}
                  <h4 className="notification-message">{notification.title}</h4>
                  <p className="notification-message">
                    {notification.description}
                  </p>
                </>
              )}

              {/* Render General Notifications */}
              {notification.type === "notification" && (
                <>
                  <p className="notification-message">{notification.message}</p>
                </>
              )}

              <span className="notification-time">
                {formatTime(notification.createdAt)}
              </span>
            </div>
          ))
        ) : (
          <p>No notifications to display</p>
        )}
      </div>

    </div>
  );
};

export default Notifications;


  // const fetchNotifications = async () => {
  //   try {
  //     const response = await api.get(`${baseUrlapp}getAllNotifications`);
  //     if (response.data.success) {
  //       setNotifications(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching transactions:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

      {/* <h2>Notifications</h2> */}
      {/* <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{formatTime(notification.createdAt)}</span>
            </div>

          ))
        ) : (
          <p>No notifications to display</p>
        )}
      </div>
      <div className="notifications-list">
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <div key={notification._id} className="notification-item">
        {notification.eventImg && (
          <img src={notification.eventImg} alt={notification.title} className="event-image" />
        )}
        <h4 className="notification-message">{notification.title}</h4>
        <p className="notification-message">{notification.description}</p>
        <span className="notification-time">{formatTime(notification.createdAt)}</span>
      </div>
    ))
  ) : (
    <p>No notifications to display</p>
  )}
</div> */}