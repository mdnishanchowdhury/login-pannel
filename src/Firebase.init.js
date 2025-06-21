// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADcLRcKPZRIlRrwHOo0vxybg_YroKTiJo",
    authDomain: "login-panel-6fd78.firebaseapp.com",
    projectId: "login-panel-6fd78",
    storageBucket: "login-panel-6fd78.firebasestorage.app",
    messagingSenderId: "927926182554",
    appId: "1:927926182554:web:ea87922fe7d232927cb523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);