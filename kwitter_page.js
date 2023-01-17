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
  room_name = localStorage.getItem("room_name");
  function send()
  {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          likes:0
      });
      document.getElementById("msg").value="";
  }
  function logout()
       {
          localStorage.removeItem("room_name");
          localStorage.removeItem("user_name");
          window.location = "index.html";
       }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;

       

console.log(firebase_message_id);
console.log(message_data);
name = message_data["name"];
message = message_data["message"];
likes = message_data["likes"];
name_with_tag = "<h4>"+ name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+likes+" onclick='updateLike(this.id)'>"; 
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ likes +"</span></button><hr>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;

    } });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes)+1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          likes : updated_likes
    });
}
