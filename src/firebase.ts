import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAJf6cu9nB3VWT3zxcjyrACht--l4Eprig",
  authDomain: "event-pass-6ddd0.firebaseapp.com",
  projectId: "event-pass-6ddd0",
  storageBucket: "event-pass-6ddd0.appspot.com",
  messagingSenderId: "68292782342",
  appId: "1:68292782342:web:e7edab07a49a0ce75d9687",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
