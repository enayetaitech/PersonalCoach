import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-hj8Yg3MA2wGQgcb0_La-ytaNkhpNjF8",
  authDomain: "personal-coach-73b2a.firebaseapp.com",
  projectId: "personal-coach-73b2a",
  storageBucket: "personal-coach-73b2a.appspot.com",
  messagingSenderId: "210790406130",
  appId: "1:210790406130:web:7ed911a941a1682d557d6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;