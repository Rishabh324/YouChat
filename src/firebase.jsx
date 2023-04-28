// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq9oq9Kr4CapcVaULF7ltqE9RqY2a6fCk",
  authDomain: "matesapp-576e0.firebaseapp.com",
  projectId: "matesapp-576e0",
  storageBucket: "matesapp-576e0.appspot.com",
  messagingSenderId: "277914024701",
  appId: "1:277914024701:web:e436db8d3618df23645c94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);