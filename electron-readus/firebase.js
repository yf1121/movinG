import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd8tr0y47lvUhyL7NWT112epaxWXsMABw",
  authDomain: "moving-5e9c4.firebaseapp.com",
  projectId: "moving-5e9c4",
  storageBucket: "moving-5e9c4.appspot.com",
  messagingSenderId: "1032830265053",
  appId: "1:1032830265053:web:f989c3ee6e6fb588669d34",
  measurementId: "G-Z7JJY20GS8",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
// alert(db.collection("data").get("aaa"));