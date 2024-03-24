import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuaybBiIKDqT1ReghY7Y2ctza6ewsxmK0",
    authDomain: "bluey-hidden-objects.firebaseapp.com",
    projectId: "bluey-hidden-objects",
    storageBucket: "bluey-hidden-objects.appspot.com",
    messagingSenderId: "828398638364",
    appId: "1:828398638364:web:81f68d8f2c82e40072d6d9",
    measurementId: "G-60CYTYLF4K"

};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider =  new GoogleAuthProvider();
const storage = getStorage();


export { auth, provider, storage };
export default db;