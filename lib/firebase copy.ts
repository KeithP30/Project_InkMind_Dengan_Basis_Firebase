import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "RAHASIA...",

  authDomain: "YOUR DOMAIN",

  projectId: "YOUR PRJ ID",

  storageBucket: "...",

  messagingSenderId: "...",

  appId: "...",

  measurementId: "..."

};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, auth, db };

