import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNOfts4ayv21jWRJmzLmgofu-pr-o7jbk",
  authDomain: "adey-project-101.firebaseapp.com",
  projectId: "adey-project-101",
  storageBucket: "adey-project-101.firebasestorage.app",
  messagingSenderId: "297593546149",
  appId: "1:297593546149:web:3efc1cb7e9db412dd8f44c",
  measurementId: "G-8F2YQYZBJN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase services
export { app, db, auth };