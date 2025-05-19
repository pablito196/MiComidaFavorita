// Import the functions you need from the SDKs you need
import '@expo/metro-runtime';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARMFNPOYD-glGmyb_H3MqJHNfgY-lObG0",
  authDomain: "micomidafavorita-13d64.firebaseapp.com",
  projectId: "micomidafavorita-13d64",
  storageBucket: "micomidafavorita-13d64.firebasestorage.app",
  messagingSenderId: "901444758720",
  appId: "1:901444758720:web:150112d2c286a3c2891125",
  measurementId: "G-BG900DHHR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);