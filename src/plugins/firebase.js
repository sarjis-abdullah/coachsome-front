import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyBGUQbN8qrBYnBoU0H5g3PPmHMjR8TBcWo",
    authDomain: "coachsome-45818.firebaseapp.com",
    projectId: "coachsome-45818",
    storageBucket: "coachsome-45818.appspot.com",
    messagingSenderId: "595050113258",
    appId: "1:595050113258:web:d3f173320008d2b1304f93",
    measurementId: "G-0PT7YCYCS5"
};
console.log("firebase started");

const app = initializeApp(firebaseConfig);
export {
    getMessaging,
    getToken,
    app
};