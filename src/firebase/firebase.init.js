// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// do not share  config in public 
const firebaseConfig = {
  apiKey: "AIzaSyCC3DnbaE2F4ZabxccFx8f6mxW5H-5gflI",
  authDomain: "email-password-auth-19b75.firebaseapp.com",
  projectId: "email-password-auth-19b75",
  storageBucket: "email-password-auth-19b75.firebasestorage.app",
  messagingSenderId: "455995832150",
  appId: "1:455995832150:web:a1972fdd1b9c262b5248f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);