<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBUYuhM2r5kMezKfVfQubnzIYqez9YU01w",
    authDomain: "motherduckkitchen.firebaseapp.com",
    projectId: "motherduckkitchen",
    storageBucket: "motherduckkitchen.firebasestorage.app",
    messagingSenderId: "926461915461",
    appId: "1:926461915461:web:953768033f54d3b586ce2c",
    measurementId: "G-F6PBRYNPS4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
