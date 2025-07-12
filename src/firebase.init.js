// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAATLFunFqdLBfckSciHZz7aNDBxdWym60",
  authDomain: "scholarship-management-s-4bf47.firebaseapp.com",
  projectId: "scholarship-management-s-4bf47",
  storageBucket: "scholarship-management-s-4bf47.firebasestorage.app",
  messagingSenderId: "991795065900",
  appId: "1:991795065900:web:ead500010532df677c0d89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);