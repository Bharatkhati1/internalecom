// // importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// // importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
importScripts(
    "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
  );
  
  const firebaseConfig = {
    apiKey: "AIzaSyAeznKGl71GHlWWTe5nXvZ01ADNJBbvD2Y",
    authDomain: "covid-19-traker-5f23f.firebaseapp.com",
    projectId: "covid-19-traker-5f23f",
    storageBucket: "covid-19-traker-5f23f.appspot.com", // ✅ FIXED: correct bucket domain
    messagingSenderId: "228123181322",
    appId: "1:228123181322:web:9f0a80aa117352add77af3",
    measurementId: "G-4975RDME47"
  };
  
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(async (payload) => {
    try {
      console.log("payload notification*****************",payload.notification)
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "https://crowdbotics.ghost.io/content/images/size/w1000/2021/02/ReactNativeFeaturedImage.png",
        actions: [
          {
            action: "view",
            title: "View",
          },
          {
            action: "cancel",
            title: "Cancel",
          },
        ],
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    } catch (error) {
      console.error("Error handling background message:", error);
    }
  });
  
  self.addEventListener("notificationclick", function (event) {
    const clickedNotification = event.notification;
    const action = event.action;
    if (action === "view") {
      const urlToOpen = "https://staging.kognics.com/main-dashboard";
      event.waitUntil(clients.openWindow(urlToOpen));
    } else if (action === "cancel") {
      clickedNotification.close();
    }
  });
