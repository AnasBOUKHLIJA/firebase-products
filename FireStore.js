import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, deleteDoc, query, where, orderBy, limit }  from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

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
const db = getFirestore(app);


function getUserAndNote () {
    const user = document.querySelector("form #user").value;
    const note = document.querySelector("form #note").value;
    return {user,note};
}
function getDate (){
    var d = new Date,
    dformat = dformat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
    return dformat;
}

console.log(getDate());

function displayFile(docId,title,subtitle,text){
    let items = document.querySelector(".auth-body-side-2 .info");
    let div1 = document.createElement("div");

    let div2 = document.createElement("div");

    div1.setAttribute("class","card");
    div1.style.width = "96%";
    div1.style.margin = "2%";

    div2.setAttribute("class","card-body");
    div2.style.backgroundColor = "#acabab";

    let _title = document.createElement("h5");
    let _subtitle = document.createElement("h6");
    let _text = document.createElement("p");
    
    _title.innerHTML = `ID : ${docId} <br /> ${title}`;
    _subtitle.innerHTML = subtitle;
    _text.innerHTML = text;

    _title.setAttribute("class", "card-title");
    _subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
    _text.setAttribute("class", "card-text");
        
        
    div2.appendChild(_title);
    div2.appendChild(_subtitle);
    div2.appendChild(_text);

    div1.appendChild(div2);

    items.appendChild(div1);
}

async function getNotes (){
    const querySnapshot = await getDocs(collection(db, "notes"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.id,doc.data().user,doc.data().date,doc.data().note);
    displayFile(doc.id,doc.data().user,doc.data().date,doc.data().note);
    });
}

getNotes();

document.querySelector("#enregistrer").addEventListener('click',async (e)=>{
  e.preventDefault();
    const {user,note} = getUserAndNote();
    const collectionRef = collection(db, "notes");
    await addDoc(collectionRef, {
        user,
        note,
        date: getDate()
    }).then((result) => {
        console.log(result);
        alert("Document written with ID: "+result.id );
    }).catch((error)=>{
        alert(error);
    });
});


document.querySelector("#obtenir").addEventListener('click',async (e)=>{
    e.preventDefault();
    const docId = document.querySelector("form #docId").value;
    document.querySelector(".auth-body-side-2 .info").innerHTML = "";
    if(docId != ""){
        const docRef = doc(db, "notes", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            displayFile(docSnap.id,docSnap.data().user,docSnap.data().date,docSnap.data().note);
            console.log("Document data:", docSnap.data());
        } else {
            alert("No such document!")
        }        
    } else {
        getNotes();
    }
});

document.querySelector("#supprimer").addEventListener('click',async (e)=>{
    e.preventDefault();
    const docId = document.querySelector("form #docId").value;
    await deleteDoc(doc(db, "notes", docId))
    .then( () => {
        alert("Document deleted");
    }).catch((error)=>{
        alert(error);
    });
    getNotes();
});

document.querySelector("#search-btn").addEventListener('click',async (e)=>{
    e.preventDefault();
    const search = document.querySelector("#search").value;
    document.querySelector(".auth-body-side-2 .info").innerHTML = "";
    if(search != "" ){
        const notesRef = collection(db, "notes");
        // const q = query(notesRef, where("user", "==", search),orderBy("date","desc"), limit(2));
        const q = query(notesRef, where("user", "==", search),limit(3));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            displayFile(doc.id,doc.data().user,doc.data().date,doc.data().note);
        });
    }else{
        getNotes();
    }
    
});
