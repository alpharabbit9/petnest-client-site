// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVlouxkcih8UUDtrc8meVLRB6jIfMoh2o",
  authDomain: "pawsconnect-ef5a7.firebaseapp.com",
  projectId: "pawsconnect-ef5a7",
  storageBucket: "pawsconnect-ef5a7.firebasestorage.app",
  messagingSenderId: "780727932209",
  appId: "1:780727932209:web:2000b5ac5d9950ca9ecc10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);