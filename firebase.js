import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWMVzJKkI5qm0LG3xCxNb0DlGx50s4514",
  authDomain: "eshop-c4520.firebaseapp.com",
  projectId: "eshop-c4520",
  storageBucket: "eshop-c4520.appspot.com",
  messagingSenderId: "412273646901",
  appId: "1:412273646901:web:01a713a3cb634fa4b1807c",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();

export { db };
