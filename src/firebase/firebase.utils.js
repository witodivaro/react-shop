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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error("error creating user", err.message);
    }
  }

  return userRef;
};

export const changeUserProfile = async (userAuth, newUserData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) return;

  try {
    await userRef.update({
      ...newUserData,
    });
  } catch (e) {
    console.error(e.message);
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createCredentials = (email, password) => {
  return firebase.auth.EmailAuthProvider.credential(email, password);
};

export default firebase;
