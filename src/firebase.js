// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVTDutM8NkH_IlUybQhoSh8Xoc24-CgHQ",
  authDomain: "tevron-a668c.firebaseapp.com",
  databaseURL: "https://tevron-a668c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tevron-a668c",
  storageBucket: "tevron-a668c.appspot.com", // 🔹 fix storage bucket
  messagingSenderId: "865853097438",
  appId: "1:865853097438:web:c2a61af5e0db0de763094f",
  measurementId: "G-08YNG5GQHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Realtime Database
const db = getDatabase(app);

export { db };
