 
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfvn19bc0Zm9o_nQW_DAbL2zNFQWEfLU8",
  authDomain: "vue-chat-app-2164a.firebaseapp.com",
  databaseURL: "https://vue-chat-app-2164a-default-rtdb.firebaseio.com",
  projectId: "vue-chat-app-2164a",
  storageBucket: "vue-chat-app-2164a.appspot.com",
  messagingSenderId: "488677606539",
  appId: "1:488677606539:web:ee6443008d40169d58008e",
  measurementId: "G-KBE1CKCZKE"
};

// Initialize Firebase
const  db= firebase.initializeApp(firebaseConfig);
 
  export default db;