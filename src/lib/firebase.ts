
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJDXV8JAyOWROfPBfjNJYMJeW6LAP0kzo",
  authDomain: "aprendo-fa52e.firebaseapp.com",
  projectId: "aprendo-fa52e",
  storageBucket: "aprendo-fa52e.firebasestorage.app",
  messagingSenderId: "925577475798",
  appId: "1:925577475798:web:a057f694295bb806ea7b77",
  measurementId: "G-L9VHENDE2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
