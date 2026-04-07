import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCrB2QfyDMcNk5ydTGbHUGrUYBk1gFVJ3Y",

  authDomain: "mobile-prj-c55cb.firebaseapp.com",

  projectId: "mobile-prj-c55cb",

  storageBucket: "mobile-prj-c55cb.firebasestorage.app",

  messagingSenderId: "472348663178",

  appId: "1:472348663178:web:75802dca76107302b4fc73",

  measurementId: "G-MDTG7R7LTP"

};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, auth, db };

