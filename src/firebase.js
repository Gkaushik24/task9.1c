import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDorDWoavW0qegNhfdmp7VkEMcf0L98KMU",
  authDomain: "dev-deakin-auth-1972e.firebaseapp.com",
  projectId: "dev-deakin-auth-1972e",
  storageBucket: "dev-deakin-auth-1972e.firebasestorage.app",
  messagingSenderId: "173092056630",
  appId: "1:173092056630:web:f191c9d1187b8033a27297",
  measurementId: "G-V43B0EB9W0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
