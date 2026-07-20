// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-project-9bf2a.firebaseapp.com",
  projectId: "real-estate-mern-project-9bf2a",
  storageBucket: "real-estate-mern-project-9bf2a.firebasestorage.app",
  messagingSenderId: "824043355862",
  appId: "1:824043355862:web:cbb512ec8b960c18721377"
};

console.log(import.meta.env.VITE_FIREBASE_API_KEY)

// Initialize Firebase
export const app = initializeApp(firebaseConfig);