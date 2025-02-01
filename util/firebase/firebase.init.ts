// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_wcJ7Cu-e-CLgzIP8HteXipo652An_38",
  authDomain: "calculation-mils.firebaseapp.com",
  projectId: "calculation-mils",
  storageBucket: "calculation-mils.appspot.com",
  messagingSenderId: "366943326263",
  appId: "1:366943326263:web:21e732a185ed9c85f32fb2",
  measurementId: "G-SKVMXCG3TQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);