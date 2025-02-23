import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, 
         GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuZ-Z-G_wjKm1yxzz0O26IzEBMXfURpWg",
  authDomain: "med-app-2fde8.firebaseapp.com",
  databaseURL: "https://med-app-2fde8-default-rtdb.firebaseio.com",
  projectId: "med-app-2fde8",
  storageBucket: "med-app-2fde8.firebasestorage.app",
  messagingSenderId: "712372987359",
  appId: "1:712372987359:web:7d6b205ec366c0d4eed06a",
  measurementId: "G-JLBSPB84R1"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };
