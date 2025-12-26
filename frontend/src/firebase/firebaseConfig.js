import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASABfnJHOKe_XDkXxpwx7ibA14FZWNMp0",
  authDomain: "food-startup-b6b9a.firebaseapp.com",
  projectId: "food-startup-b6b9a",
  storageBucket: "food-startup-b6b9a.appspot.com",
  messagingSenderId: "609731657206",
  appId: "1:609731657206:web:c5d7275349af1cec1cdbd7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
