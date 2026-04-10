// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAev__FPd2lcGleH9jR5HFbQ3TU46xTiOI",
  authDomain: "nowingdev.firebaseapp.com",
  projectId: "nowingdev",
  storageBucket: "nowingdev.firebasestorage.app",
  messagingSenderId: "1010379975924",
  appId: "1:1010379975924:web:157d29fcd02871991182a1",
  measurementId: "G-4VNC7HWMQX"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/images/io24-featured-keynote-developer.webp'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
