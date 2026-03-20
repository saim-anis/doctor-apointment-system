// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBiPh-JfyHTrEcpbsVZk9umNti1uNdhrf4",
  authDomain: "hospital-appointment-boo-c11ff.firebaseapp.com",
  projectId: "hospital-appointment-boo-c11ff",
  storageBucket: "hospital-appointment-boo-c11ff.firebasestorage.app",
  messagingSenderId: "129711659058",
  appId: "1:129711659058:web:97f3736f0c8b82b0e8c42b",
  measurementId: "G-SH31Y9VEJ9"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)




