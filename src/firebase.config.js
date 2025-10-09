import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiL7qWRC7EgeZqJGlRCQ-uQdZhzuhm6Ug",
  authDomain: "chatapp-project01.firebaseapp.com",
  projectId: "chatapp-project01",
  storageBucket: "chatapp-project01.firebasestorage.app",
  messagingSenderId: "547460023703",
  appId: "1:547460023703:web:33803ae514dae052e070d2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let auth = getAuth(app);
export  {auth}