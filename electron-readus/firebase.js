// import firebase from 'firebase/app';
// import "firebase/firestore";
// import "firebase/auth";

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
// const firebase = require("electron").remote.require("firebase")

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd8tr0y47lvUhyL7NWT112epaxWXsMABw",
  authDomain: "moving-5e9c4.firebaseapp.com",
  projectId: "moving-5e9c4",
  databaseURL : "https://moving-5e9c4.firebaseio.com",
  storageBucket: "moving-5e9c4.appspot.com",
  messagingSenderId: "1032830265053",
  appId: "1:1032830265053:web:f989c3ee6e6fb588669d34",
  measurementId: "G-Z7JJY20GS8",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const citiesRef = db.collection('data').doc('room1');
const city = await citiesRef.get();
alert("firebase.js");
alert('Document data:', city.data());
alert(city.exists);
if (!city.exists) {
  alert('No such document!');
} else {
  alert('Document data:', city.data());
}
// export default firebase;
// alert(db.collection("data").get("aaa"));