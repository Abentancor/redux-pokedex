import { initializeApp } from "firebase/app";
import {getAuth, signOut} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCofGRUMRoioeW83kdasqsmAPF_WDQZAyg",
  authDomain: "pokeredux-8e6c9.firebaseapp.com",
  projectId: "pokeredux-8e6c9",
  storageBucket: "pokeredux-8e6c9.appspot.com",
  messagingSenderId: "140462008389",
  appId: "1:140462008389:web:62a68883dadb9656c89b2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const logOut = ()=>{
  return signOut(auth)
}

