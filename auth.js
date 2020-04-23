

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("user_div").style.display="block"; 
      document.getElementById("login_div").style.display="none";
    
    } else {
      // No user is signed in.
      document.getElementById("user_div").style.display="block";
      document.getElementById("login_div").style.display="initial";
    
    }
  });
  


function Login(){
    var UserEmail= document.getElementById("email_field").value;
    var UserPassword = document.getElementById("password_field").value;
    
    firebase.auth().signInWithEmailAndPassword(UserEmail, UserPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorCode)
      // ...
    });
  }