// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);