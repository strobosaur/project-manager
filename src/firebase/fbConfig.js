import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAYyKrLiCzuPZmgKmf5awxzCDtiZL-t4eM",
  authDomain: "project-manager-9f9ff.firebaseapp.com",
  projectId: "project-manager-9f9ff",
  storageBucket: "project-manager-9f9ff.appspot.com",
  messagingSenderId: "607036761331",
  appId: "1:607036761331:web:53a462e6cea6b144010386"
};

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

// INITIALIZE SERVICES
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// TIMESTAMP
const timestamp = firebase.firestore.Timestamp;

// EXPORTS
export { projectFirestore, projectAuth, timestamp }