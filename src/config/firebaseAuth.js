// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtTaxaV3SQlLU5Rk61CKr-nYtI6_E1S98",
  authDomain: "swiggy-clone-186d9.firebaseapp.com",
  projectId: "swiggy-clone-186d9",
  storageBucket: "swiggy-clone-186d9.appspot.com",
  messagingSenderId: "663099196781",
  appId: "1:663099196781:web:09aafe340fcb87367c4664",
  measurementId: "G-X69MWE03EW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

const provider = new GoogleAuthProvider();

export {auth, provider};
