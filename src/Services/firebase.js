// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAeznKGl71GHlWWTe5nXvZ01ADNJBbvD2Y",
  authDomain: "covid-19-traker-5f23f.firebaseapp.com",
  projectId: "covid-19-traker-5f23f",
  storageBucket: "covid-19-traker-5f23f.appspot.com", 
  messagingSenderId: "228123181322",
  appId: "1:228123181322:web:9f0a80aa117352add77af3",
  measurementId: "G-4975RDME47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export messaging instance
const messaging = getMessaging(firebaseApp);

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "./firebase-messaging-sw.js"
      );
      if (registration.installing) {
        console.log("installing")
      } else if (registration.waiting) {
        console.log("waiting")
      } else if (registration.active) {
        console.log("active")
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

export { firebaseApp, messaging };
