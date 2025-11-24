// Service worker para Firebase Cloud Messaging

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

// Handler opcional para notificaciones en segundo plano
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Mensaje en background:", payload);
  const notificationTitle = payload.notification?.title || "Mensaje de Navidad en OXXO";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes una actualización en tu minijuego.",
    icon: "/android-chrome-192x192.png" // opcional, quítalo si no tienes icono
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
