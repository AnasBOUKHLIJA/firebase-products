    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
    import {  getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

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

    function getUsernameAndPassword () {
      const username = document.querySelector("form #username").value;
      const password = document.querySelector("form #password").value;
      return {username,password};
    }

    function displayUserCredential(img,uid,username,data){
      document.querySelector(".auth-body-side-2 .info #userPhoto").setAttribute("src", img);
      document.querySelector(".auth-body-side-2 .info #userUid").value = uid ;
      document.querySelector(".auth-body-side-2 .info #UserUsername").value = username ;
      document.querySelector(".auth-body-side-2 .info #UserDetails").innerHTML = JSON.stringify(data)  ;
    }
    
    document.querySelector("#enregistrer").addEventListener('click',(e)=>{
      e.preventDefault();
      const {username,password} = getUsernameAndPassword();
      createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        displayUserCredential(user.photoURL,user.uid,user.email,userCredential);
        console.log(userCredential);
      })
      .catch((error) => {
        alert(error);
      });

  });

  document.querySelector("#connexion").addEventListener('click',(e)=>{
        e.preventDefault();
        const {username,password} = getUsernameAndPassword();
        //console.log(`Username = ${username} and Password = ${password}`);
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          displayUserCredential(user.photoURL,user.uid,user.email,userCredential);
          console.log(userCredential);
        })
        .catch((error) => {
          alert(error);
        });
    });

    document.querySelector("#reinitialisation").addEventListener('click',(e)=>{
      e.preventDefault();
      const {username,password} = getUsernameAndPassword();
      sendPasswordResetEmail(auth, username)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error);
      });
  });
    document.querySelector("#connexion-Google").addEventListener('click',(e)=>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          displayUserCredential(user.photoURL,user.uid,user.email,result);
          console.log(user)
        }).catch((error) => {
          alert(error);
        });
    });

    document.querySelector("#connexion-Facebook").addEventListener('click',(e)=>{
        e.preventDefault();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth,provider).then((result) => {
          // The signed-in user info.
          const user = result.user;
          console.log(user)
        }).catch((error) => {
          alert(error);
        });
    });


