    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
    import {  getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

    const firebaseConfig = {
        apiKey: "AIzaSyBKFm3EYU3Hej9KniNnu4fxVBDdC0ve2u4",
        authDomain: "fir-services-4a701.firebaseapp.com",
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
  
    const username = document.querySelector("form #username");
    const password = document.querySelector("form #password");
    document.querySelector("#connexion").addEventListener('click',(e)=>{
        e.preventDefault();
        console.log(username.value);
    });

    document.querySelector("#connexion-Google").addEventListener('click',(e)=>{
        e.preventDefault();
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

    });

    document.querySelector("#connexion-Facebook").addEventListener('click',(e)=>{
        e.preventDefault();

    });