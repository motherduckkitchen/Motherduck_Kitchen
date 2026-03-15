(function () {
  if (!window.MDK_FIREBASE_CONFIG) {
    console.error("Firebase config missing");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.MDK_FIREBASE_CONFIG);
  }

  window.MDK_DB = firebase.firestore();
  window.MDK_STORAGE = firebase.storage ? firebase.storage() : null;
})();
