// Service worker para Firebase Cloud Messaging (modo compat)

importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js");

// Mismo config que en app.html
const firebaseConfig = {
  apiKey: "AIzaSyBCqxfR74vgZ2dIo6mKbNJIx0Nw4PsjVJU",
  authDomain: "christmas-gamepass.firebaseapp.com",
  projectId: "christmas-gamepass",
  storageBucket: "christmas-gamepass.firebasestorage.app",
  messagingSenderId: "335985713484",
  appId: "1:335985713484:web:9f2db5a010d89995046fe9"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// ✅ 1) Cuando llega un mensaje en background, mostramos notificación
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Mensaje en background:", payload);

  const notificationTitle =
    (payload.notification && payload.notification.title) ||
    "Navidad en OXXO 🎄";

  const notificationOptions = {
    body:
      (payload.notification && payload.notification.body) ||
      "Tienes una nueva misión en tu Christmas Gamepass.",
    // icon: "/icon.png", // si quieres ícono, ponlo aquí
    // Pasamos los datos personalizados tal cual, incluyendo click_action_url
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ 2) Cuando el usuario hace click en la notificación
self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const data = clickedNotification.data || {};

  // Si viene el campo click_action_url en los datos, lo usamos
  const targetUrl =
    data.click_action_url ||
    "https://lordluis2021.github.io/christmas-gamepass/app.html"; // fallback

  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
