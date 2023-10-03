// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGTo2D32mOFNiZvE2ud8ZPc7_6VI_xQEs",
  authDomain: "cs55-13-week7-aidanbraun.firebaseapp.com",
  projectId: "cs55-13-week7-aidanbraun",
  storageBucket: "cs55-13-week7-aidanbraun.appspot.com",
  messagingSenderId: "82425550078",
  appId: "1:82425550078:web:27ee34be254886eda541af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };