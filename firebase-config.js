import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getFirestore, collection, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzIKIbyzGjrBKGjjAaW_BNU_Hy6Lk7hug",
    authDomain: "ppmpl-30ee4.firebaseapp.com",
    projectId: "ppmpl-30ee4",
    storageBucket: "ppmpl-30ee4.firebasestorage.app",
    messagingSenderId: "705966128421",
    appId: "1:705966128421:web:52571fb8b443092d8ceecc",
    measurementId: "G-YP3MNNH214"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getFirestore(app);

// Export Firebase services
export { auth, db, collection, query, where, getDocs, serverTimestamp };



