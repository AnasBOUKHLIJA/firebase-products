
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  // Add Firebase products that you want to use
  import {  getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

  const firebaseConfig = {
    apiKey: "AIzaSyBKFm3EYU3Hej9KniNnu4fxVBDdC0ve2u4",
    authDomain: "fir-services-4a701.firebaseapp.com",
    databaseURL: "https://fir-services-4a701-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-services-4a701",
    storageBucket: "fir-services-4a701.appspot.com",
    messagingSenderId: "948264685987",
    appId: "1:948264685987:web:fbb515cf8f6d2c0fecca16",
    measurementId: "G-X3JNYYSVVJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);


  
