const firebaseConfig = {
    apiKey: "AIzaSyA8dSaJ3nl0sWKA0f4Bymp0PO54brtfXgE",
    authDomain: "kwitter-app-55bbe.firebaseapp.com",
    databaseURL: "https://kwitter-app-55bbe-default-rtdb.firebaseio.com",
    projectId: "kwitter-app-55bbe",
    storageBucket: "kwitter-app-55bbe.appspot.com",
    messagingSenderId: "405625591916",
    appId: "1:405625591916:web:44fee70039414d36b42049",
    measurementId: "G-Y3NSV8SZVY"
  };
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML= 'Welcome '+ user_name + '!';

function addRoom() {
    room_name = document.getElementById('room_name').value;
    firebase.database().ref('/').child(room_name).update({
          purpose : "Hello"
   });
   localStorage.setItem('room_name' , room_name);
   window.location = 'kwitter_page.html';
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
   console.log('Room Name -'+ room_name);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
   document.getElementById("output").innerHTML +=row;
   //End code
    });});}
getData();

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name" , name);
    window.location = "kwitter_page.html";

}
