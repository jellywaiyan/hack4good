import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW9RQe527hgk1UlKCVB4VlGOHl0wP0Wp4",
  authDomain: "hack4good-4a814.firebaseapp.com",
  projectId: "hack4good-4a814",
  storageBucket: "hack4good-4a814.appspot.com",
  messagingSenderId: "390679416148",
  appId: "1:390679416148:web:dad1ea5c7485e95614ccc1",
  measurementId: "G-92TNEKQGHR",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
