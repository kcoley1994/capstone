import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAysQ8dp994WBylG82BP9_5tB2O9T1vWsI",
  authDomain: "thevybe-7611e.firebaseapp.com",
  projectId: "thevybe-7611e",
  storageBucket: "thevybe-7611e.appspot.com",
  messagingSenderId: "787391828374",
  appId: "1:787391828374:web:9c64e59999c5ed9bf14db7"
};


export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export const storage = getStorage();

export const db = getFirestore(app);
