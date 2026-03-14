<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBRTV9KfMYjCGk1XYnsCoOBZaZ9h-sU6UA",
    authDomain: "motherduckkitchen-e2e1c.firebaseapp.com",
    projectId: "motherduckkitchen-e2e1c",
    storageBucket: "motherduckkitchen-e2e1c.firebasestorage.app",
    messagingSenderId: "459081978963",
    appId: "1:459081978963:web:8ac93c105b4a86c504a2a6",
    measurementId: "G-F1933BLB5H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
