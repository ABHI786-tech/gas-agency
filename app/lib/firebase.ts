// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBis8DEuy_QYgdh3eABUY6B2utMb77kGxw",
  authDomain: "gas-agency-client.firebaseapp.com",
  projectId: "gas-agency-client",
  storageBucket: "gas-agency-client.firebasestorage.app",
  messagingSenderId: "658665710124",
  appId: "1:658665710124:web:72ad165a763fbbddb4a789",
  measurementId: "G-HSB7VF1J55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Firestore DB
export const db = getFirestore(app);