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

// 🔹 Mostrar notificación cuando llegue un mensaje en background
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Mensaje en background:", payload);

  const notificationTitle =
    (payload.notification && payload.notification.title) ||
    "Navidad en OXXO 🎄";

  const notificationOptions = {
    body:
      (payload.notification && payload.notification.body) ||
      "Tienes una nueva misión en tu Christmas Gamepass.",
    // icon: "icon.png" // si luego quieres un ícono, lo pones aquí
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 🔹 Al hacer click en la notificación → abrir el hub del juego
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = "https://lordluis2021.github.io/christmas-gamepass/app.html";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        // Si ya hay una pestaña abierta con el hub, la enfocamos
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // Si no, abrimos una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
