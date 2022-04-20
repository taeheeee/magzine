import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtNzYIetmQJC79JpZxpjS_A_Z6akGN120",
  authDomain: "image-community-a0bd6.firebaseapp.com",
  projectId: "image-community-a0bd6",
  storageBucket: "image-community-a0bd6.appspot.com",
  messagingSenderId: "704068071978",
  appId: "1:704068071978:web:73c5bf6686ebbf77980953",
  measurementId: "G-6GVZH75430",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
