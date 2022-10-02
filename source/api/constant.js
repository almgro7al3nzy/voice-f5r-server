import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import firebase from 'firebase/compat'
import 'firebase/messaging';
import 'firebase/analytics';
import "firebase/auth";
import 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyA3hFzvzs-2yhtZw7WXnneLmR0_Jlppp2A",
    authDomain: "chatrealtime-71b1b.firebaseapp.com",
    databaseURL: "https://chatrealtime-71b1b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatrealtime-71b1b",
    storageBucket: "chatrealtime-71b1b.appspot.com",
    messagingSenderId: "504105494387",
    appId: "1:504105494387:web:09a176e8164c45a23b4706",
    measurementId: "G-9M3VE79XNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
export const Table = {Room:'Room',Chat:'Chat',User:'User'}
export default app;