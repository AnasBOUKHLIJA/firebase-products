import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getDatabase, ref, set, onValue, remove }  from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';

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
const database = getDatabase(app);


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

function displayNote(key,title,subtitle,text){
    //console.log(document.querySelector(`#${key}`));
    if(document.querySelector("#id-card") === null){
        let items = document.querySelector(".auth-body-side-2 .info");
        let div1 = document.createElement("div");

        let div2 = document.createElement("div");

        div1.setAttribute("class","card");
        div1.setAttribute("id",key);
        div1.style.width = "96%";
        div1.style.margin = "2%";

        div2.setAttribute("class","card-body");
        div2.style.backgroundColor = "#acabab";

        let _title = document.createElement("h5");
        let _subtitle = document.createElement("h6");
        let _text = document.createElement("p");
        
        _title.innerHTML = `ID : ${key} <br /> ${title}`;
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
}

async function getNotes (){
    const notesRef = ref(database, 'notes/');
    onValue(notesRef, (snapshot) => {
        document.querySelector(".auth-body-side-2 .info").innerHTML = "";
        const data = snapshot.val();
        const result = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        console.log(result);
        result.map(element => {
            displayNote(element.id,element.user,element.date,element.note);
        });
    });
}

getNotes();

document.querySelector("#enregistrer").addEventListener('click',async (e)=>{
  e.preventDefault();
    const {user,note} = getUserAndNote();
    let date = new Date;
    const key = date.getTime();
    set(ref(database, `notes/${key}` ), {
        user,
        note,
        date : getDate()
    });
});


document.querySelector("#obtenir").addEventListener('click',async (e)=>{
    e.preventDefault();
    const key = document.querySelector("form #docId").value;
    if(key != ""){
        document.querySelector(".auth-body-side-2 .info").innerHTML = "";
        const noteRef = ref(database, `/notes/${key}`);
        onValue(noteRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            displayNote(key,data.user,data.date,data.note);
        });
    }
});

document.querySelector("#supprimer").addEventListener('click',async (e)=>{
    e.preventDefault();
    const key = document.querySelector("form #docId").value;
    const noteRef = ref(database, `/notes/${key}`);
    remove(noteRef).then(()=>{
        alert("note has Removed");
    }).catch((error)=>{
        alert(error)
    });
});


