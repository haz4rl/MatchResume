import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX1Y2Ubi_53Zg8kxDAZOnT-F-zwvW6Ivs",
  authDomain: "matchresume-2037d.firebaseapp.com",
  projectId: "matchresume-2037d",
  storageBucket: "matchresume-2037d.firebasestorage.app",
  messagingSenderId: "217327033284",
  appId: "1:217327033284:web:cb52f27f84814f9f5ae291",
  measurementId: "G-SCEVY50YHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);