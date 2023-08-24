import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIc2dWNUbzbPbHDhI3CvyzCIqeJxmpscc",
    authDomain: "zillow-clone-39d10.firebaseapp.com",
    projectId: "zillow-clone-39d10",
    storageBucket: "zillow-clone-39d10.appspot.com",
    messagingSenderId: "115460393220",
    appId: "1:115460393220:web:d5ec4554b17705190d2851",
    measurementId: "G-SPX7V9Q0JN"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Firebase storage reference
export const storage = getStorage(app);
export const db = getFirestore();