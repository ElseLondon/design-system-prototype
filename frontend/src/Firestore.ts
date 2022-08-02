import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {    
    apiKey: "AIzaSyBq3kzut8hbGHb1ScI3G6M7oNmFYvQyU1E",
    authDomain: "design-system-prototype-5a79b.firebaseapp.com",
    projectId: "design-system-prototype-5a79b",
    storageBucket: "design-system-prototype-5a79b.appspot.com",
    messagingSenderId: "144699095666",
    appId: "1:144699095666:web:b5c929b03fc9fdb16a20eb",
    measurementId: "G-NL7Y3YT6DD"
};

export const initializeFirebase = () => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    const db = getFirestore();

    return db;
}