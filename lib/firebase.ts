import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASEAPI,
    authDomain: "feedback-gen-52ea9.firebaseapp.com",
    projectId: "feedback-gen-52ea9",
    storageBucket: "feedback-gen-52ea9.appspot.com",
    messagingSenderId: "463298788519",
    appId: "1:463298788519:web:77e1bc5878ef343bfb6f82",
    measurementId: "G-YN05HZK7TK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { app, auth, provider };
