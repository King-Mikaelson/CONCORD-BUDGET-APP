// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCcc0RKocz6g13f3wZjIdQyWUpm2Vfpww",
  authDomain: "consord-14970.firebaseapp.com",
  projectId: "consord-14970",
  storageBucket: "consord-14970.appspot.com",
  messagingSenderId: "1073509637880",
  appId: "1:1073509637880:web:b06251d39f0d41414d650d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth};