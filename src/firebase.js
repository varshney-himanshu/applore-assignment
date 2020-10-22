import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDWWUj-ZfFHapTlLnXcgeRjmgF88_kIwLk",
  authDomain: "applore-assignment.firebaseapp.com",
  databaseURL: "https://applore-assignment.firebaseio.com",
  projectId: "applore-assignment",
  storageBucket: "applore-assignment.appspot.com",
  messagingSenderId: "358044596045",
  appId: "1:358044596045:web:a64fecf00ff59604e6a904",
  measurementId: "G-75G217557M",
};

firebase.initializeApp(config);

export default firebase;
