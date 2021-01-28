import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAi6kUgVK8pPIZndcj6osblMWqIEcaGpWk",
  authDomain: "react-shop-itechart.firebaseapp.com",
  projectId: "react-shop-itechart",
  storageBucket: "react-shop-itechart.appspot.com",
  messagingSenderId: "41695673616",
  appId: "1:41695673616:web:f868112c014492e1e0f995",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
