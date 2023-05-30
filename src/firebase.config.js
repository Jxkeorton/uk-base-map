import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWP88RdAz7bAiuVhVMBHdY4lYPn4rG2xk",
  authDomain: "uk-base-map.firebaseapp.com",
  projectId: "uk-base-map",
  storageBucket: "uk-base-map.appspot.com",
  messagingSenderId: "899524901759",
  appId: "1:899524901759:web:a9f93a52e50e13ec5ef84a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()