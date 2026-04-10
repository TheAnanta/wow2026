// src/services/fcm.ts
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "YOUR_VAPID_KEY_HERE";

export const requestFirebaseToken = async () => {
  if (!messaging) return null;
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const registration = await navigator.serviceWorker.getRegistration() || 
                             await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        
        const currentToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          return currentToken;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return null;
        }
      } catch (swError) {
        console.error('Service worker registration failed:', swError);
        return null;
      }
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      resolve(payload);
    });
  });
