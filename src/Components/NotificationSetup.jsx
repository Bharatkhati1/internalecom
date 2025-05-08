import { useEffect } from "react";
import { registerDevice } from "../Services/emailApiServices";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../Services/firebase";

// Optional: You can replace alert with a custom toast or modal for better UX
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const NotificationSetup = () => {
  const user = localStorage.getItem("user");
  const userDetails = JSON.parse(user);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
          import.meta.env.VITE_FCE_KEY,
        });
        if (token) {
          await registerDevice({
            userId: userDetails.id,
            token,
            platform: "web",
          });
          console.log("Device registered!");
        }
      } catch (error) {
        console.error("Notification setup failed:", error);
      }
    };

    if (userDetails?.id != null) {
      setupNotifications();
    }

    // Foreground notification listener using Firebase Messaging
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔥 Message received in foreground:", payload);

      const notificationTitle = payload.notification.title;
      const notificationBody = payload.notification.body;

      // Display notification using React Toastify or any other method
      toast(`${notificationTitle}: ${notificationBody}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        type: "info", 
      });
    });

    // Cleanup the foreground message listener when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userDetails?.id]); 

  return null; 
};

export default NotificationSetup;
