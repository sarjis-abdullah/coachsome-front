// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGUQbN8qrBYnBoU0H5g3PPmHMjR8TBcWo",
    authDomain: "coachsome-45818.firebaseapp.com",
    databaseURL: "https://coachsome-45818-default-rtdb.firebaseio.com",
    projectId: "coachsome-45818",
    storageBucket: "coachsome-45818.appspot.com",
    messagingSenderId: "595050113258",
    appId: "1:595050113258:web:d3f173320008d2b1304f93",
    measurementId: "G-0PT7YCYCS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
    addDoc,
    collection,
    db,
    doc,
    onSnapshot,
    query
}