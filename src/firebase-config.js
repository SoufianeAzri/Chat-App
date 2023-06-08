// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL3m-0eYeNbIXMt0y7mO2JPny42fIIB_E",
  authDomain: "chatapp-8d85b.firebaseapp.com",
  projectId: "chatapp-8d85b",
  storageBucket: "chatapp-8d85b.appspot.com",
  messagingSenderId: "628723445115",
  appId: "1:628723445115:web:02d21db22e3722866021de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);