import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject }  from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js';

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
const storage = getStorage(app);


function displayFile(file,data){
  document.querySelector(".auth-body-side-2 .info #StorageFile").setAttribute("src", file);
  document.querySelector(".auth-body-side-2 .info #FileDetails").innerHTML = JSON.stringify(data)  ;
  
}

document.querySelector("#enregistrer").addEventListener('click',(e)=>{
  e.preventDefault();
  const file = document.querySelector("form #file").files[0];
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  getUploadState(storageRef,uploadTask);
});

async function getUploadState(storageRef,uploadTask){
    await uploadTask.on("state_changed",
    (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(`${progress}%`);
        document.querySelector("#progress").style.width = `${progress}%`;
    },
    (error) => {
    alert(error);
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            displayFile(downloadURL,storageRef);
        }
    )});
}

document.querySelector("#importer").addEventListener('click',(e)=>{
    e.preventDefault();
    const fileRef = document.querySelector("form #ref").value;
    const storageRef = ref(storage, fileRef);
    getDownloadURL(storageRef)
    .then((downloadURL) => {
        displayFile(downloadURL,storageRef);
    }).catch((error) => {
        alert(error);
    });
});

document.querySelector("#supprimer").addEventListener('click',(e)=>{
    e.preventDefault();
    const fileRef = document.querySelector("form #ref").value;
    const storageRef = ref(storage, fileRef);
    deleteObject(storageRef).then(() => {
        alert("File deleted successfully")
    }).catch((error) => {
        alert(error);
    });
});
// function getFile () {
//     const file = document.querySelector("form #file").files[0]; 
//     let fileReader = new FileReader(); 
//     fileReader.readAsText(file); 
//     fileReader.onload = function() {
//         console.log(fileReader.result);
//         return fileReader.result;
//     }; 
//     fileReader.onerror = function() {
//         alert(fileReader.error);
//     }; 
// }