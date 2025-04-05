import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCemdV3gK91kobsIXlzTjfV9WTJJn2bQIs",
  authDomain: "yuss-five.firebaseapp.com",
  projectId: "yuss-five",
  storageBucket: "yuss-five.firebasestorage.app",
  messagingSenderId: "725381439826",
  appId: "1:725381439826:web:e2fc4a33076fff12601a8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
auth.languageCode = "en"; // Optional: Set default language

export const googleProvider = new GoogleAuthProvider();
