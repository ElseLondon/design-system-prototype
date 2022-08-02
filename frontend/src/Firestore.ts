import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    // apiKey: "",
    // authDomain: "design-system-prototype-5a79b.firebaseapp.com",
    // projectId: "design-system-prototype-5a79b",
    // storageBucket: "design-system-prototype-5a79b.appspot.com",
    // messagingSenderId: "",
    // appId: "",
    // measurementId: ""
    
};

export const initializeFirebase = () => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    const db = getFirestore();

    return db;
}