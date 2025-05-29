function initApp() {
  document.getElementById("login-div").style.display="block";
  document.getElementById("logged-div").style.display="none";
  document.getElementById("task-div").style.display="none";
  document.getElementById("create-div").style.display="none";
  document.getElementById("print-div").style.display="none";
  document.getElementById("modify-div").style.display="none";
  document.getElementById("searchSheet").innerHTML=null;
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-verify-email').disabled = true;
    document.getElementById('sign-out').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      document.getElementById('sign-out').disabled = false;
      if (emailVerified){
        document.getElementById("login-div").style.display="none";
        document.getElementById("logged-div").style.display="block";
        document.getElementById("task-div").style.display="none";
        document.getElementById("create-div").style.display="none";
        document.getElementById("print-div").style.display="none";
        // Revise Welcome 
        var userName=firebase.auth().currentUser.displayName;
        var userEmail=firebase.auth().currentUser.email;
        if (userName != null){
          document.getElementById("welcome").innerHTML="Welcome "+userName+"!";
        }else{
          document.getElementById("welcome").innerHTML="Welcome "+userEmail+"!";
        }
  
        //var uid = firebase.auth().currentUser.uid;
        var firebaseRef = firebase.database().ref();
        firebaseRef.once('value').then(function(snapshot) {
          document.getElementById("taskCurrentList").innerHTML = null;
          document.getElementById("taskCompleteList").innerHTML = null;
          var obj=snapshot.val()
          for (var x in obj){
            var lCreator=snapshot.child(x).child("Creator").val();
            var lDocName=snapshot.child(x).child("DocumentName").val();
            var lProjectNumber=snapshot.child(x).child("ProjectNumber").val();
            var lProjectName=snapshot.child(x).child("ProjectName").val();
            
            var lLastUpdate=snapshot.child(x).child("LastUpdate").val();
            if (lLastUpdate == null){
              var lLastUpdate="";
            }
            var complete=snapshot.child(x).child("Complete").val();
            if(complete==null){
              document.getElementById("taskCurrentList").innerHTML += 
              '<tr onclick="jump(this)">'+
                '<td>' + x + '</td>'+
                '<td>' + lCreator + '</td>'+
                '<td>' + lProjectNumber + ' ' + lProjectName + '</td>'+
                '<td>' + lDocName + '</td>'+
                '<td>' + lLastUpdate + '</td>'+
                '</tr>'
            }else{
              document.getElementById("taskCompleteList").innerHTML += 
              '<tr onclick="jump(this)">'+
                '<td>' + x + '</td>'+
                '<td>' + lCreator + '</td>'+
                '<td>' + lProjectNumber + ' ' + lProjectName + '</td>'+
                '<td>' + lDocName + '</td>'+
                '<td>' + lLastUpdate + '</td>'+
                '</tr>'
            }
          }
        })
      }
      

      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'To List';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
        window.alert("Please verify your email to continue.");
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);

}

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut().then(function(){
      console.log("logged out!")
    }, function(error){
      console.log(error.code);
      console.log(error.message);
    });
    // [END signout]
  } 
  else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var emailVerified = user.emailVerified;
      if (emailVerified){
        toLogged();
      }
    } else {
      // No user is signed in.
      document.getElementById("login-div").style.display="block";
      document.getElementById("logged-div").style.display="none";
      document.getElementById("create-div").style.display="none";
      document.getElementById("print-div").style.display="none";
      document.getElementById("modify-div").style.display="none";
    }
  })
}

function handleSignUp() {
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  var emailDomain=/@hkairport.com$/g;
  if(email.match(emailDomain)){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      window.alert("Signup Successfully");
    });
  }else{
    window.alert("Please sign up with AA email!");
  }
  
  // [END createwithemail]
}

function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    alert('Email Verification Sent!');
  }).catch(function(error) {
    // Email Verification sent!
    alert("Something goes wrong!");
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

function signOut(){
  firebase.auth().signOut().then(function(){
    console.log("logged out!");
    document.getElementById("login-div").style.display="block";
    document.getElementById("logged-div").style.display="none";
    document.getElementById("task-div").style.display="none";
    document.getElementById("create-div").style.display="none";
    document.getElementById("print-div").style.display="none";
    document.getElementById("modify-div").style.display="none";
  }, function(error){
    console.log(error.code);
    console.log(error.message);
  });
}

// Edit user display name
function changeDisplayName(){
  var user = firebase.auth().currentUser;
  var newName=document.getElementById("newName").value;
  if (!newName){
    window.alert("Please input a name!");
  }else{
    user.updateProfile({
      displayName: newName,
    }).then(function(){
      window.alert("User name has been successfully changed!");
      var userName=firebase.auth().currentUser.displayName;
      document.getElementById("welcome").innerHTML="Welcome "+userName+"!";
    }).catch(function(error) {
      window.alert("Something is wrong!")
    });
  }
}

//open a new page to show one circulation details
function searchTask(){
  // Initialize Div
  document.getElementById("sheetHead").innerHTML = null;
  document.getElementById("u1Name").innerHTML =null;
  document.getElementById("u1InRecord").innerHTML =null;
  document.getElementById("u1OutRecord").innerHTML =null;
  document.getElementById("u2Name").innerHTML =null;
  document.getElementById("u2InRecord").innerHTML =null;
  document.getElementById("u2OutRecord").innerHTML =null;
  document.getElementById("u3Name").innerHTML =null;
  document.getElementById("u3InRecord").innerHTML =null;
  document.getElementById("u3OutRecord").innerHTML =null;
  document.getElementById("u4Name").innerHTML =null;
  document.getElementById("u4InRecord").innerHTML =null;
  document.getElementById("u4OutRecord").innerHTML =null;
  document.getElementById("u5Name").innerHTML =null;
  document.getElementById("u5InRecord").innerHTML =null;
  document.getElementById("u5OutRecord").innerHTML =null;
  document.getElementById("u6Name").innerHTML =null;
  document.getElementById("u6InRecord").innerHTML =null;
  document.getElementById("u6OutRecord").innerHTML =null;
  document.getElementById("u7Name").innerHTML =null;
  document.getElementById("u7InRecord").innerHTML =null;
  document.getElementById("u7OutRecord").innerHTML =null;
  document.getElementById("u8Name").innerHTML =null;
  document.getElementById("u8InRecord").innerHTML =null;
  document.getElementById("u8OutRecord").innerHTML =null;
  document.getElementById("u9Name").innerHTML =null;
  document.getElementById("u9InRecord").innerHTML =null;
  document.getElementById("u9OutRecord").innerHTML =null;
  document.getElementById("u10Name").innerHTML =null;
  document.getElementById("u10InRecord").innerHTML =null;
  document.getElementById("u10OutRecord").innerHTML =null;


  // Get Search Number
  var searchNum=document.getElementById("searchSheet").value;
  var searchNum=searchNum.toUpperCase();
  // 全局变量
  window.taskNum=searchNum;
  // 获取数据
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(searchNum).on('value', function(snapshot) {
    
    var checkNum=snapshot.child("Creator").val();
      if (checkNum == null){
        window.alert("No such a circulation has been found!");
      } else{
        document.getElementById("logged-div").style.display="none";
        document.getElementById("task-div").style.display="block";
        document.getElementById("create-div").style.display="none";
        document.getElementById("print-div").style.display="none";
        document.getElementById("modify-div").style.display="none";
  
        var sheetCreator=snapshot.child("Creator").val();
        var sheetProjectNum=snapshot.child("ProjectNumber").val();
        var sheetProjectName=snapshot.child("ProjectName").val();
        var sheetDocName=snapshot.child("DocumentName").val();
        document.getElementById("sheetHead").innerHTML = 
          '<h5 id="rePrintNum">CRF No.: ' + searchNum + '</h5>'+
          '<h5>Creator: ' + sheetCreator + '</h5>'+
          '<h5>Project: ' + sheetProjectNum + ' ' + sheetProjectName + '</h5>'+
          '<h5>Document Name: ' + sheetDocName + '</h5>'+
          '<br>';
        }
    
    // User1
    var u1Name=snapshot.child("1").child("Name").val();
    if (u1Name != ""){
      document.getElementById("u1Name").innerHTML = u1Name;
      // User1 IN Record
      var u1In=snapshot.child("1").child("IN").val();
      document.getElementById("u1InRecord").innerHTML = null;
      for (var x in u1In){
        var inTime=snapshot.child("1").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("1").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u1InRecord").innerHTML +=
        '<p>' + inTime + '<br>' + inRemark + '</p>'+
        '<br>'
      }
      // User1 OUT Record
      var u1Out=snapshot.child("1").child("OUT").val();
      document.getElementById("u1OutRecord").innerHTML = null;
      for (var x in u1Out){
        var outTime=snapshot.child("1").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("1").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u1OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User2
    var u2Name=snapshot.child("2").child("Name").val();
    if (u2Name != ""){
      document.getElementById("u2Name").innerHTML = u2Name;
      // User2 IN Record
      var u2In=snapshot.child("2").child("IN").val();
      document.getElementById("u2InRecord").innerHTML = null;
      for (var x in u2In){
        var inTime=snapshot.child("2").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("2").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u2InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User2 OUT Record
      var u2Out=snapshot.child("2").child("OUT").val();
      document.getElementById("u2OutRecord").innerHTML = null;
      for (var x in u2Out){
        var outTime=snapshot.child("2").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("2").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u2OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User3
    var u3Name=snapshot.child("3").child("Name").val();
    if (u3Name != ""){
      document.getElementById("u3Name").innerHTML = u3Name;
      // User3 IN Record
      var u3In=snapshot.child("3").child("IN").val();
      document.getElementById("u3InRecord").innerHTML = null;
      for (var x in u3In){
        var inTime=snapshot.child("3").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("3").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u3InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User3 OUT Record
      var u3Out=snapshot.child("3").child("OUT").val();
      document.getElementById("u3OutRecord").innerHTML = null;
      for (var x in u3Out){
        var outTime=snapshot.child("3").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("3").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u3OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User4
    var u4Name=snapshot.child("4").child("Name").val();
    if (u4Name != ""){
      document.getElementById("u4Name").innerHTML = u4Name;
      // User4 IN Record
      var u4In=snapshot.child("4").child("IN").val();
      document.getElementById("u4InRecord").innerHTML = null;
      for (var x in u4In){
        var inTime=snapshot.child("4").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("4").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u4InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User4 OUT Record
      var u4Out=snapshot.child("4").child("OUT").val();
      document.getElementById("u4OutRecord").innerHTML = null;
      for (var x in u4Out){
        var outTime=snapshot.child("4").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("4").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u4OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User5
    var u5Name=snapshot.child("5").child("Name").val();
    if (u5Name != ""){
      document.getElementById("u5Name").innerHTML = u5Name;
      // User5 IN Record
      var u5In=snapshot.child("5").child("IN").val();
      document.getElementById("u5InRecord").innerHTML = null;
      for (var x in u5In){
        var inTime=snapshot.child("5").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("5").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u5InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User5 OUT Record
      var u5Out=snapshot.child("5").child("OUT").val();
      document.getElementById("u5OutRecord").innerHTML = null;
      for (var x in u5Out){
        var outTime=snapshot.child("5").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("5").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u5OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User6
    var u6Name=snapshot.child("6").child("Name").val();
    if (u6Name != ""){
      document.getElementById("u6Name").innerHTML = u6Name;
      // User6 IN Record
      var u6In=snapshot.child("6").child("IN").val();
      document.getElementById("u6InRecord").innerHTML = null;
      for (var x in u6In){
        var inTime=snapshot.child("6").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("6").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u6InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User6 OUT Record
      var u6Out=snapshot.child("6").child("OUT").val();
      document.getElementById("u6OutRecord").innerHTML = null;
      for (var x in u6Out){
        var outTime=snapshot.child("6").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("6").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u6OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User7
    var u7Name=snapshot.child("7").child("Name").val();
    if (u7Name != ""){
      document.getElementById("u7Name").innerHTML = u7Name;
      // User7 IN Record
      var u7In=snapshot.child("7").child("IN").val();
      document.getElementById("u7InRecord").innerHTML = null;
      for (var x in u7In){
        var inTime=snapshot.child("7").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("7").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u7InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User7 OUT Record
      var u7Out=snapshot.child("7").child("OUT").val();
      document.getElementById("u7OutRecord").innerHTML = null;
      for (var x in u7Out){
        var outTime=snapshot.child("7").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("7").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u7OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User8 Name
    var u8Name=snapshot.child("8").child("Name").val();
    if (u8Name != ""){
      document.getElementById("u8Name").innerHTML = u8Name;
      // User8 IN Record
      var u8In=snapshot.child("8").child("IN").val();
      document.getElementById("u8InRecord").innerHTML = null;
      for (var x in u8In){
        var inTime=snapshot.child("8").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("8").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u8InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User8 OUT Record
      var u8Out=snapshot.child("8").child("OUT").val();
      document.getElementById("u8OutRecord").innerHTML = null;
      for (var x in u8Out){
        var outTime=snapshot.child("8").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("8").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u8OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User9 Name
    var u9Name=snapshot.child("9").child("Name").val();
    if (u9Name != ""){
      document.getElementById("u9Name").innerHTML = u9Name;
      // User9 IN Record
      var u9In=snapshot.child("9").child("IN").val();
      document.getElementById("u9InRecord").innerHTML = null;
      for (var x in u9In){
        var inTime=snapshot.child("9").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("9").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u9InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User9 OUT Record
      var u9Out=snapshot.child("9").child("OUT").val();
      document.getElementById("u9OutRecord").innerHTML = null;
      for (var x in u9Out){
        var outTime=snapshot.child("9").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("9").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u9OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User10 Name
    var u10Name=snapshot.child("10").child("Name").val();
    if (u10Name != ""){
      document.getElementById("u10Name").innerHTML = u10Name;
      // User10 IN Record
      var u10In=snapshot.child("10").child("IN").val();
      document.getElementById("u10InRecord").innerHTML = null;
      for (var x in u10In){
        var inTime=snapshot.child("10").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("10").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u10InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User10 OUT Record
      var u10Out=snapshot.child("10").child("OUT").val();
      document.getElementById("u10OutRecord").innerHTML = null;
      for (var x in u10Out){
        var outTime=snapshot.child("10").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("10").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u10OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  });
}

// jump to circulation creation page
function toCreate(){
  var userName=firebase.auth().currentUser.displayName;
  if (userName == null){
    window.alert("Please define your name first!");
  }else{
    document.getElementById("logged-div").style.display="none";
    document.getElementById("print-div").style.display="none";
    document.getElementById("create-div").style.display="block";
    document.getElementById("modify-div").style.display="none";
    // Init Div
    document.getElementById("docName").value =null;
    document.getElementById("projectNum").value =null;
    document.getElementById("projectName").value =null;
    document.getElementById("cirNum").value =null;
    document.getElementById("name1").value =null;
    document.getElementById("tit1").value =null;
    document.getElementById("name2").value =null;
    document.getElementById("tit2").value =null;
    document.getElementById("name3").value =null;
    document.getElementById("tit3").value =null;
    document.getElementById("name4").value =null;
    document.getElementById("tit4").value =null;
    document.getElementById("name5").value =null;
    document.getElementById("tit4").value =null;
    document.getElementById("name6").value =null;
    document.getElementById("tit6").value =null;
    document.getElementById("name7").value =null;
    document.getElementById("tit7").value =null;
    document.getElementById("name8").value =null;
    document.getElementById("tit8").value =null;
    document.getElementById("name9").value =null;
    document.getElementById("tit9").value =null;
    document.getElementById("name10").value =null;
    document.getElementById("tit10").value =null;

    firebase.database().ref().once('value', function(snapshot){
      console.log(snapshot.val());

    });
  }
}

// jump to logged page
function toLogged(){
  document.getElementById("header").style.display="block";
  document.getElementById("logged-div").style.display="block";
  document.getElementById("task-div").style.display="none";
  document.getElementById("create-div").style.display="none";
  document.getElementById("print-div").style.display="none";
  document.getElementById("modify-div").style.display="none";
  document.getElementById("searchSheet").innerHTML=null;
  // Initi QR Code Div
  document.getElementById("print-qrcode").innerHTML="";
  document.getElementById("modi-qrcode").innerHTML="";
  // Revise Welcome 
  var userName=firebase.auth().currentUser.displayName;
  var userEmail=firebase.auth().currentUser.email;
  if (userName != null){
    document.getElementById("welcome").innerHTML="Welcome "+userName+"!";
  }else{
    document.getElementById("welcome").innerHTML="Welcome "+userEmail+"!";
  }

  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function(snapshot) {
    document.getElementById("taskCurrentList").innerHTML = null;
    document.getElementById("taskCompleteList").innerHTML = null;
    var obj=snapshot.val()
    for (var x in obj){
      var lCreator=snapshot.child(x).child("Creator").val();
      var lDocName=snapshot.child(x).child("DocumentName").val();
      var lProjectNumber=snapshot.child(x).child("ProjectNumber").val();
      var lProjectName=snapshot.child(x).child("ProjectName").val();

      var lLastUpdate=snapshot.child(x).child("LastUpdate").val();
      if (lLastUpdate == null){
        var lLastUpdate="";
      }
      var complete=snapshot.child(x).child("Complete").val();
      if(complete==null){
        document.getElementById("taskCurrentList").innerHTML += 
        '<tr onclick="jump(this)">'+
          '<td>' + x + '</td>'+
          '<td>' + lCreator + '</td>'+
          '<td>' + lProjectNumber + ' ' + lProjectName + '</td>'+
          '<td>' + lDocName + '</td>'+
          '<td>' + lLastUpdate + '</td>'+
        '</tr>'
      }else{
        document.getElementById("taskCompleteList").innerHTML += 
        '<tr onclick="jump(this)">'+
          '<td>' + x + '</td>'+
          '<td>' + lCreator + '</td>'+
          '<td>' + lProjectNumber + ' ' + lProjectName + '</td>'+
          '<td>' + lDocName + '</td>'+
          '<td>' + lLastUpdate + '</td>'+
        '</tr>'
      }
      
    }
  });
}

//submit the circulation info to create the circulation
function submitList(){
  var name1=document.getElementById("name1").value;
  var name1=name1.replace(/(^\s*)|(\s*$)/g, "");
  if (name1 != null && name1 != ""){
    userNum=1;
  }

  var name2=document.getElementById("name2").value;
  var name2=name2.replace(/(^\s*)|(\s*$)/g, "");
  if (name2 != null && name2 != ""){
    userNum=2;
  }

  var name3=document.getElementById("name3").value;
  var name3=name3.replace(/(^\s*)|(\s*$)/g, "");
  if (name3 != null && name3 != ""){
    userNum=3;
  }

  var name4=document.getElementById("name4").value;
  var name4=name4.replace(/(^\s*)|(\s*$)/g, "");
  if (name4 != null && name4 != ""){
    userNum=4;
  }

  var name5=document.getElementById("name5").value;
  var name5=name5.replace(/(^\s*)|(\s*$)/g, "");
  if (name5 != null && name5 != ""){
    userNum=5;
  }

  var name6=document.getElementById("name6").value;
  var name6=name6.replace(/(^\s*)|(\s*$)/g, "");
  if (name6 != null && name6 != ""){
    userNum=6;
  }

  var name7=document.getElementById("name7").value;
  var name7=name7.replace(/(^\s*)|(\s*$)/g, "");
  if (name7 != null && name7 != ""){
    userNum=7;
  }

  var name8=document.getElementById("name8").value;
  var name8=name8.replace(/(^\s*)|(\s*$)/g, "");
  if (name8 != null && name8 != ""){
    userNum=8;
  }

  var name9=document.getElementById("name9").value;
  var name9=name9.replace(/(^\s*)|(\s*$)/g, "");
  if (name9 != null && name9 != ""){
    userNum=9;
  }

  var name10=document.getElementById("name10").value;
  var name10=name10.replace(/(^\s*)|(\s*$)/g, "");
  if (name10 != null && name10 != ""){
    userNum=10;
  }

  var tit1=document.getElementById("tit1").value;
  var tit1=tit1.replace(/(^\s*)|(\s*$)/g, "");

  var tit2=document.getElementById("tit2").value;
  var tit2=tit2.replace(/(^\s*)|(\s*$)/g, "");

  var tit3=document.getElementById("tit3").value;
  var tit3=tit3.replace(/(^\s*)|(\s*$)/g, "");

  var tit4=document.getElementById("tit4").value;
  var tit4=tit4.replace(/(^\s*)|(\s*$)/g, "");

  var tit5=document.getElementById("tit5").value;
  var tit5=tit5.replace(/(^\s*)|(\s*$)/g, "");

  var tit6=document.getElementById("tit6").value;
  var tit6=tit6.replace(/(^\s*)|(\s*$)/g, "");

  var tit7=document.getElementById("tit7").value;
  var tit7=tit7.replace(/(^\s*)|(\s*$)/g, "");

  var tit8=document.getElementById("tit8").value;
  var tit8=tit8.replace(/(^\s*)|(\s*$)/g, "");

  var tit9=document.getElementById("tit9").value;
  var tit9=tit9.replace(/(^\s*)|(\s*$)/g, "");

  var tit10=document.getElementById("tit10").value;
  var tit10=tit10.replace(/(^\s*)|(\s*$)/g, "");

  var projectNum=document.getElementById("projectNum").value;
  var projectNum=projectNum.replace(/(^\s*)|(\s*$)/g, "");
  var projectNum=projectNum.toUpperCase();

  var docName=document.getElementById("docName").value;
  var docName=docName.replace(/(^\s*)|(\s*$)/g, "");
  var docName=docName.toUpperCase();

  var projectName=document.getElementById("projectName").value;
  var projectName=projectName.replace(/(^\s*)|(\s*$)/g, "");
  var projectName=projectName.toUpperCase();

  var cirNum=document.getElementById("cirNum").value;
  var cirNum=cirNum.replace(/(^\s*)|(\s*$)/g, "");
  var cirNum=cirNum.toUpperCase();

  var userName=firebase.auth().currentUser.displayName;
  var creatorEmail=firebase.auth().currentUser.email;

  var firebaseRef = firebase.database().ref();
  var nowTime = new Date();
  var createTime=nowTime.toGMTString();
  var sheet = {
    "CreateTime":createTime,
    "Creator":userName,
    "CreatorEmail":creatorEmail,
    "ProjectNumber":projectNum,
    "ProjectName":projectName,
    "DocumentName":docName,
    "UserNumber":userNum,
    "1":{
      "Name":name1,
      "Title":tit1,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "2":{
      "Name":name2,
      "Title":tit2,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "3":{
      "Name":name3,
      "Title":tit3,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "4":{
      "Name":name4,
      "Title":tit4,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "5":{
      "Name":name5,
      "Title":tit5,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "6":{
      "Name":name6,
      "Title":tit6,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "7":{
      "Name":name7,
      "Title":tit7,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "8":{
      "Name":name8,
      "Title":tit8,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "9":{
      "Name":name9,
      "Title":tit9,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "10":{
      "Name":name10,
      "Title":tit10,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
  }
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function(snapshot) {
    var obj=snapshot.val()
    for (var x in obj){
      if (x==cirNum){
        window.alert("This CRF No. is existing! Please define an another CRF No.");
        document.getElementById("cirNum").value=null;
      }else{
        firebaseRef.child(cirNum).set(sheet);

        // Page jump
        document.getElementById("logged-div").style.display="none";
        document.getElementById("task-div").style.display="none";
        document.getElementById("create-div").style.display="none";
        document.getElementById("header").style.display="none";
        document.getElementById("print-div").style.display="block";
        document.getElementById("modify-div").style.display="none";
      
        // Print sheet create
       
        document.getElementById("printConNum").innerHTML="CONTRACT "+projectNum;
        document.getElementById("printProjectName").innerHTML=projectName;
      
        var createDate =nowTime.toDateString();
        document.getElementById("printNum").innerHTML="CRF No. " + cirNum;
        document.getElementById("printTime").innerHTML=createDate;
        document.getElementById("printDocName").innerHTML=docName;
      
        document.getElementById("printName1").innerHTML=name1;
        document.getElementById("printName2").innerHTML=name2;
        document.getElementById("printName3").innerHTML=name3;
        document.getElementById("printName4").innerHTML=name4;
        document.getElementById("printName5").innerHTML=name5;
        document.getElementById("printName6").innerHTML=name6;
        document.getElementById("printName7").innerHTML=name7;
        document.getElementById("printName8").innerHTML=name8;
        document.getElementById("printName9").innerHTML=name9;
        document.getElementById("printName10").innerHTML=name10;
      
        document.getElementById("printTit1").innerHTML=tit1;
        document.getElementById("printTit2").innerHTML=tit2;
        document.getElementById("printTit3").innerHTML=tit3;
        document.getElementById("printTit4").innerHTML=tit4;
        document.getElementById("printTit5").innerHTML=tit5;
        document.getElementById("printTit6").innerHTML=tit6;
        document.getElementById("printTit7").innerHTML=tit7;
        document.getElementById("printTit8").innerHTML=tit8;
        document.getElementById("printTit9").innerHTML=tit9;
        document.getElementById("printTit10").innerHTML=tit10;
      
        document.getElementById("ps").innerHTML=
          '<p>Please send the document to next person after signature.</p>' +
          '<p>Please contact ' + userName + ', CWD at 2/F if there is any enquiries.</p>' +
          '<p>Please return to Ava Fung, CWD at 2/F when the last person signed.</p>';
      }
    }
  }) 
  var qrcode = new QRCode(document.getElementById("print-qrcode"), {
    width: 100,
    height: 100,
  });
  qrcode.clear();
  qrcode.makeCode("https://doctracking-scanner.firebaseapp.com/?" + cirNum);
  document.getElementById("Addr").innerHTML="https://doctracking-scanner.firebaseapp.com/?" + cirNum;
}

function deleteTask(){
  
  var currentNum=window.taskNum;
  var userEmail=firebase.auth().currentUser.email;
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function(snapshot) {
    var creatorEmail=snapshot.child(currentNum).child("CreatorEmail").val();
    if (userEmail!=creatorEmail){
      window.alert("Only the creator can delete this task!");
    }else{
      firebase.database().ref().child(currentNum).remove();
      toLogged();
    } 
  })
}

function checkCRF(){
  var cirNum = document.getElementById("cirNum").value;
  var cirNum = cirNum.toUpperCase();
  document.getElementById("cirNum").value=cirNum;
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function(snapshot) {
    var obj=snapshot.val()
    for (var x in obj){
      if (x==cirNum){
        window.alert("This CRF No. is existing! Please define an another CRF No.");
        document.getElementById("cirNum").value=null;
      }
    }
  })
}

function isKeyPressed(event) {
  var x = event.key;
  if (x=="Enter") {
    searchTask();
  }
}

function copy(){

  // Page Jump
  document.getElementById("task-div").style.display="none";
  document.getElementById("logged-div").style.display="none";
  document.getElementById("print-div").style.display="none";
  document.getElementById("create-div").style.display="block";
  document.getElementById("modify-div").style.display="none";

  // Init Div
  document.getElementById("docName").value =null;
  document.getElementById("projectNum").value =null;
  document.getElementById("projectName").value =null;
  document.getElementById("cirNum").value =null;
  document.getElementById("name1").value =null;
  document.getElementById("tit1").value =null;
  document.getElementById("name2").value =null;
  document.getElementById("tit2").value =null;
  document.getElementById("name3").value =null;
  document.getElementById("tit3").value =null;
  document.getElementById("name4").value =null;
  document.getElementById("tit4").value =null;
  document.getElementById("name5").value =null;
  document.getElementById("tit4").value =null;
  document.getElementById("name6").value =null;
  document.getElementById("tit6").value =null;
  document.getElementById("name7").value =null;
  document.getElementById("tit7").value =null;
  document.getElementById("name8").value =null;
  document.getElementById("tit8").value =null;
  document.getElementById("name9").value =null;
  document.getElementById("tit9").value =null;
  document.getElementById("name10").value =null;
  document.getElementById("tit10").value =null;
  
  // Call Database
  var firebaseRef = firebase.database().ref();
  var cirNum=window.taskNum;
  firebaseRef.child(cirNum).on('value', function(snapshot) {

    // Task Head
    var sheetProjectNum=snapshot.child("ProjectNumber").val();
    var sheetProjectName=snapshot.child("ProjectName").val();
    var sheetDocName=snapshot.child("DocumentName").val();
    document.getElementById("docName").value = sheetDocName;
    document.getElementById("projectNum").value = sheetProjectNum;
    document.getElementById("projectName").value = sheetProjectName;
    document.getElementById("cirNum").value = null;
    
    // Fill User Info
    // User1
    var u1Name=snapshot.child("1").child("Name").val();
    var u1Title=snapshot.child("1").child("Title").val();
    document.getElementById("name1").value = u1Name;
    document.getElementById("tit1").value = u1Title;

    // User2
    var u2Name=snapshot.child("2").child("Name").val();
    var u2Title=snapshot.child("2").child("Title").val();
    document.getElementById("name2").value = u2Name;
    document.getElementById("tit2").value = u2Title;

    // User3
    var u3Name=snapshot.child("3").child("Name").val();
    var u3Title=snapshot.child("3").child("Title").val();
    document.getElementById("name3").value = u3Name;
    document.getElementById("tit3").value = u3Title;

    // User4
    var u4Name=snapshot.child("4").child("Name").val();
    var u4Title=snapshot.child("4").child("Title").val();
    document.getElementById("name4").value = u4Name;
    document.getElementById("tit4").value = u4Title;

    // User5
    var u5Name=snapshot.child("5").child("Name").val();
    var u5Title=snapshot.child("5").child("Title").val();
    document.getElementById("name5").value = u5Name;
    document.getElementById("tit5").value = u5Title;

    // User6
    var u6Name=snapshot.child("6").child("Name").val();
    var u6Title=snapshot.child("6").child("Title").val();
    document.getElementById("name6").value = u6Name;
    document.getElementById("tit6").value = u6Title;

    // User7
    var u7Name=snapshot.child("7").child("Name").val();
    var u7Title=snapshot.child("7").child("Title").val();
    document.getElementById("name7").value = u7Name;
    document.getElementById("tit7").value = u7Title;

    // User8
    var u8Name=snapshot.child("8").child("Name").val();
    var u8Title=snapshot.child("8").child("Title").val();
    document.getElementById("name8").value = u8Name;
    document.getElementById("tit8").value = u8Title;

    // User9
    var u9Name=snapshot.child("9").child("Name").val();
    var u9Title=snapshot.child("9").child("Title").val();
    document.getElementById("name9").value = u9Name;
    document.getElementById("tit9").value = u9Title;

    // User10
    var u10Name=snapshot.child("10").child("Name").val();
    var u10Title=snapshot.child("10").child("Title").val();
    document.getElementById("name10").value = u10Name;
    document.getElementById("tit10").value = u10Title;
  })
}

function jump(jump){
  var jumpNum=jump.childNodes[0].innerHTML;
  window.taskNum=jumpNum;
  window.cirNum=jumpNum;

  // Initialize Div
  document.getElementById("sheetHead").innerHTML = null;
  document.getElementById("u1Name").innerHTML =null;
  document.getElementById("u1InRecord").innerHTML =null;
  document.getElementById("u1OutRecord").innerHTML =null;
  document.getElementById("u2Name").innerHTML =null;
  document.getElementById("u2InRecord").innerHTML =null;
  document.getElementById("u2OutRecord").innerHTML =null;
  document.getElementById("u3Name").innerHTML =null;
  document.getElementById("u3InRecord").innerHTML =null;
  document.getElementById("u3OutRecord").innerHTML =null;
  document.getElementById("u4Name").innerHTML =null;
  document.getElementById("u4InRecord").innerHTML =null;
  document.getElementById("u4OutRecord").innerHTML =null;
  document.getElementById("u5Name").innerHTML =null;
  document.getElementById("u5InRecord").innerHTML =null;
  document.getElementById("u5OutRecord").innerHTML =null;
  document.getElementById("u6Name").innerHTML =null;
  document.getElementById("u6InRecord").innerHTML =null;
  document.getElementById("u6OutRecord").innerHTML =null;
  document.getElementById("u7Name").innerHTML =null;
  document.getElementById("u7InRecord").innerHTML =null;
  document.getElementById("u7OutRecord").innerHTML =null;
  document.getElementById("u8Name").innerHTML =null;
  document.getElementById("u8InRecord").innerHTML =null;
  document.getElementById("u8OutRecord").innerHTML =null;
  document.getElementById("u9Name").innerHTML =null;
  document.getElementById("u9InRecord").innerHTML =null;
  document.getElementById("u9OutRecord").innerHTML =null;
  document.getElementById("u10Name").innerHTML =null;
  document.getElementById("u10InRecord").innerHTML =null;
  document.getElementById("u10OutRecord").innerHTML =null;

  // 获取数据
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(jumpNum).on('value', function(snapshot) {
    
    var checkNum=snapshot.child("Creator").val();
      if (checkNum == null){
        window.alert("No such a circulation has been found!");
      } else{
        document.getElementById("logged-div").style.display="none";
        document.getElementById("task-div").style.display="block";
        document.getElementById("create-div").style.display="none";
        document.getElementById("print-div").style.display="none";
        document.getElementById("modify-div").style.display="none";
  
        var sheetCreator=snapshot.child("Creator").val();
        var sheetProjectNum=snapshot.child("ProjectNumber").val();
        var sheetProjectName=snapshot.child("ProjectName").val();
        var sheetDocName=snapshot.child("DocumentName").val();
        document.getElementById("sheetHead").innerHTML = 
          '<h5 id="rePrintNum">CRF No.: ' + jumpNum + '</h5>'+
          '<h5>Creator: ' + sheetCreator + '</h5>'+
          '<h5>Project: ' + sheetProjectNum + ' ' + sheetProjectName + '</h5>'+
          '<h5>Document Name: ' + sheetDocName + '</h5>'+
          '<br>';
        }
    
    // User1
    var u1Name=snapshot.child("1").child("Name").val();
    if (u1Name != ""){
      document.getElementById("u1Name").innerHTML = u1Name;
      // User1 IN Record
      var u1In=snapshot.child("1").child("IN").val();
      document.getElementById("u1InRecord").innerHTML = null;
      for (var x in u1In){
        var inTime=snapshot.child("1").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("1").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u1InRecord").innerHTML +=
        '<p>' + inTime + '<br>' + inRemark + '</p>'+
        '<br>'
      }
      // User1 OUT Record
      var u1Out=snapshot.child("1").child("OUT").val();
      document.getElementById("u1OutRecord").innerHTML = null;
      for (var x in u1Out){
        var outTime=snapshot.child("1").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("1").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u1OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User2
    var u2Name=snapshot.child("2").child("Name").val();
    if (u2Name != ""){
      document.getElementById("u2Name").innerHTML = u2Name;
      // User2 IN Record
      var u2In=snapshot.child("2").child("IN").val();
      document.getElementById("u2InRecord").innerHTML = null;
      for (var x in u2In){
        var inTime=snapshot.child("2").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("2").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u2InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User2 OUT Record
      var u2Out=snapshot.child("2").child("OUT").val();
      document.getElementById("u2OutRecord").innerHTML = null;
      for (var x in u2Out){
        var outTime=snapshot.child("2").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("2").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u2OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User3
    var u3Name=snapshot.child("3").child("Name").val();
    if (u3Name != ""){
      document.getElementById("u3Name").innerHTML = u3Name;
      // User3 IN Record
      var u3In=snapshot.child("3").child("IN").val();
      document.getElementById("u3InRecord").innerHTML = null;
      for (var x in u3In){
        var inTime=snapshot.child("3").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("3").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u3InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User3 OUT Record
      var u3Out=snapshot.child("3").child("OUT").val();
      document.getElementById("u3OutRecord").innerHTML = null;
      for (var x in u3Out){
        var outTime=snapshot.child("3").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("3").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u3OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User4
    var u4Name=snapshot.child("4").child("Name").val();
    if (u4Name != ""){
      document.getElementById("u4Name").innerHTML = u4Name;
      // User4 IN Record
      var u4In=snapshot.child("4").child("IN").val();
      document.getElementById("u4InRecord").innerHTML = null;
      for (var x in u4In){
        var inTime=snapshot.child("4").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("4").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u4InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User4 OUT Record
      var u4Out=snapshot.child("4").child("OUT").val();
      document.getElementById("u4OutRecord").innerHTML = null;
      for (var x in u4Out){
        var outTime=snapshot.child("4").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("4").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u4OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User5
    var u5Name=snapshot.child("5").child("Name").val();
    if (u5Name != ""){
      document.getElementById("u5Name").innerHTML = u5Name;
      // User5 IN Record
      var u5In=snapshot.child("5").child("IN").val();
      document.getElementById("u5InRecord").innerHTML = null;
      for (var x in u5In){
        var inTime=snapshot.child("5").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("5").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u5InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User5 OUT Record
      var u5Out=snapshot.child("5").child("OUT").val();
      document.getElementById("u5OutRecord").innerHTML = null;
      for (var x in u5Out){
        var outTime=snapshot.child("5").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("5").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u5OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User6
    var u6Name=snapshot.child("6").child("Name").val();
    if (u6Name != ""){
      document.getElementById("u6Name").innerHTML = u6Name;
      // User6 IN Record
      var u6In=snapshot.child("6").child("IN").val();
      document.getElementById("u6InRecord").innerHTML = null;
      for (var x in u6In){
        var inTime=snapshot.child("6").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("6").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u6InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User6 OUT Record
      var u6Out=snapshot.child("6").child("OUT").val();
      document.getElementById("u6OutRecord").innerHTML = null;
      for (var x in u6Out){
        var outTime=snapshot.child("6").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("6").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u6OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User7
    var u7Name=snapshot.child("7").child("Name").val();
    if (u7Name != ""){
      document.getElementById("u7Name").innerHTML = u7Name;
      // User7 IN Record
      var u7In=snapshot.child("7").child("IN").val();
      document.getElementById("u7InRecord").innerHTML = null;
      for (var x in u7In){
        var inTime=snapshot.child("7").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("7").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u7InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User7 OUT Record
      var u7Out=snapshot.child("7").child("OUT").val();
      document.getElementById("u7OutRecord").innerHTML = null;
      for (var x in u7Out){
        var outTime=snapshot.child("7").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("7").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u7OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User8 Name
    var u8Name=snapshot.child("8").child("Name").val();
    if (u8Name != ""){
      document.getElementById("u8Name").innerHTML = u8Name;
      // User8 IN Record
      var u8In=snapshot.child("8").child("IN").val();
      document.getElementById("u8InRecord").innerHTML = null;
      for (var x in u8In){
        var inTime=snapshot.child("8").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("8").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u8InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User8 OUT Record
      var u8Out=snapshot.child("8").child("OUT").val();
      document.getElementById("u8OutRecord").innerHTML = null;
      for (var x in u8Out){
        var outTime=snapshot.child("8").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("8").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u8OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User9 Name
    var u9Name=snapshot.child("9").child("Name").val();
    if (u9Name != ""){
      document.getElementById("u9Name").innerHTML = u9Name;
      // User9 IN Record
      var u9In=snapshot.child("9").child("IN").val();
      document.getElementById("u9InRecord").innerHTML = null;
      for (var x in u9In){
        var inTime=snapshot.child("9").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("9").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u9InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User9 OUT Record
      var u9Out=snapshot.child("9").child("OUT").val();
      document.getElementById("u9OutRecord").innerHTML = null;
      for (var x in u9Out){
        var outTime=snapshot.child("9").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("9").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u9OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  
  
    // User10 Name
    var u10Name=snapshot.child("10").child("Name").val();
    if (u10Name != ""){
      document.getElementById("u10Name").innerHTML = u10Name;
      // User10 IN Record
      var u10In=snapshot.child("10").child("IN").val();
      document.getElementById("u10InRecord").innerHTML = null;
      for (var x in u10In){
        var inTime=snapshot.child("10").child("IN").child(x).child("Time").val();
        if (inTime == null){
          var inTime = "";
        }
        var inRemark=snapshot.child("10").child("IN").child(x).child("Remark").val();
        if (inRemark == null){
          var inRemark = "";
        }else{
          var inRemark = "Remark: " + inRemark;
        }
        document.getElementById("u10InRecord").innerHTML +=
          '<p>' + inTime + '<br>' + inRemark + '</p>'+
          '<br>'
      }
      // User10 OUT Record
      var u10Out=snapshot.child("10").child("OUT").val();
      document.getElementById("u10OutRecord").innerHTML = null;
      for (var x in u10Out){
        var outTime=snapshot.child("10").child("OUT").child(x).child("Time").val();
        if (outTime == null){
          var outTime = "";
        }
        var outRemark=snapshot.child("10").child("OUT").child(x).child("Remark").val();
        if (outRemark == null){
          var outRemark = "";
        }else{
          var outRemark = "Remark: " + outRemark;
        }
        document.getElementById("u10OutRecord").innerHTML +=
          '<p>' + outTime + '<br>' + outRemark + '</p>'+
          '<br>'
      } 
    }
  });
}

function toPrint(){
  var cirNum = window.taskNum;

  // Page jump
  document.getElementById("logged-div").style.display="none";
  document.getElementById("task-div").style.display="none";
  document.getElementById("create-div").style.display="none";
  document.getElementById("header").style.display="none";
  document.getElementById("print-div").style.display="block";
  document.getElementById("modify-div").style.display="none";

  var firebaseRef = firebase.database().ref(cirNum);
  firebaseRef.once('value').then(function(snapshot) {
    var creator=snapshot.child("Creator").val();
    var creatTime=snapshot.child("CreateTime").val();
    var projectNum=snapshot.child("ProjectNumber").val();
    var projectName=snapshot.child("ProjectName").val();
    var docName=snapshot.child("DocumentName").val();

    var name1=snapshot.child("1").child("Name").val();
    var tit1=snapshot.child("1").child("Title").val();
    var name2=snapshot.child("2").child("Name").val();
    var tit2=snapshot.child("2").child("Title").val();
    var name3=snapshot.child("3").child("Name").val();
    var tit3=snapshot.child("3").child("Title").val();
    var name4=snapshot.child("4").child("Name").val();
    var tit4=snapshot.child("4").child("Title").val();
    var name5=snapshot.child("5").child("Name").val();
    var tit5=snapshot.child("5").child("Title").val();
    var name6=snapshot.child("6").child("Name").val();
    var tit6=snapshot.child("6").child("Title").val();
    var name7=snapshot.child("7").child("Name").val();
    var tit7=snapshot.child("7").child("Title").val();
    var name8=snapshot.child("8").child("Name").val();
    var tit8=snapshot.child("8").child("Title").val();
    var name9=snapshot.child("9").child("Name").val();
    var tit9=snapshot.child("9").child("Title").val();
    var name10=snapshot.child("10").child("Name").val();
    var tit10=snapshot.child("10").child("Title").val();

    // Print sheet create
 
  document.getElementById("printConNum").innerHTML="CONTRACT "+projectNum;
  document.getElementById("printProjectName").innerHTML=projectName;


  document.getElementById("printNum").innerHTML="CRF No. " + cirNum;
  
  var nowTime = new Date();
  var createDate=nowTime.toDateString();
  document.getElementById("printTime").innerHTML=createDate;
  
  document.getElementById("printDocName").innerHTML="Doc Name: " + docName;

  document.getElementById("printName1").innerHTML=name1;
  document.getElementById("printName2").innerHTML=name2;
  document.getElementById("printName3").innerHTML=name3;
  document.getElementById("printName4").innerHTML=name4;
  document.getElementById("printName5").innerHTML=name5;
  document.getElementById("printName6").innerHTML=name6;
  document.getElementById("printName7").innerHTML=name7;
  document.getElementById("printName8").innerHTML=name8;
  document.getElementById("printName9").innerHTML=name9;
  document.getElementById("printName10").innerHTML=name10;

  document.getElementById("printTit1").innerHTML=tit1;
  document.getElementById("printTit2").innerHTML=tit2;
  document.getElementById("printTit3").innerHTML=tit3;
  document.getElementById("printTit4").innerHTML=tit4;
  document.getElementById("printTit5").innerHTML=tit5;
  document.getElementById("printTit6").innerHTML=tit6;
  document.getElementById("printTit7").innerHTML=tit7;
  document.getElementById("printTit8").innerHTML=tit8;
  document.getElementById("printTit9").innerHTML=tit9;
  document.getElementById("printTit10").innerHTML=tit10;

  document.getElementById("ps").innerHTML=
    '<p>Please send the document to next person after signature.</p>' +
    '<p>Please contact ' + creator + ', CWD at 2/F if there is any enquiries.</p>' +
    '<p>Please return to Ava Fung, CWD at 2/F when the last person signed.</p>';
  }); 
  
  // QR Code Generate

  var qrcode = new QRCode(document.getElementById("print-qrcode"), {
    width: 100,
    height: 100,
  });
  qrcode.clear();
  qrcode.makeCode("https://doctracking-scanner.firebaseapp.com/?" + cirNum);
  document.getElementById("Addr").innerHTML="https://doctracking-scanner.firebaseapp.com/?" + cirNum;
}

function toModify(){
  var curNum=window.taskNum;
  var userEmail=firebase.auth().currentUser.email;
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function(snapshot) {
    var creatorEmail=snapshot.child(curNum).child("CreatorEmail").val();
    if (userEmail!=creatorEmail){
      window.alert("Only the creator can modify this task!");
    }else{
      //window.alert("success");
      // Page Jump
      document.getElementById("logged-div").style.display="none";
      document.getElementById("print-div").style.display="none";
      document.getElementById("task-div").style.display="none";
      document.getElementById("create-div").style.display="none";
      document.getElementById("modify-div").style.display="block";
      // Init Div
      document.getElementById("modiName1").value =null;
      document.getElementById("modiTit1").value =null;
      document.getElementById("modiName2").value =null;
      document.getElementById("modiTit2").value =null;
      document.getElementById("modiName3").value =null;
      document.getElementById("modiTit3").value =null;
      document.getElementById("modiName4").value =null;
      document.getElementById("modiTit4").value =null;
      document.getElementById("modiName5").value =null;
      document.getElementById("modiTit4").value =null;
      document.getElementById("modiName6").value =null;
      document.getElementById("modiTit6").value =null;
      document.getElementById("modiName7").value =null;
      document.getElementById("modiTit7").value =null;
      document.getElementById("modiName8").value =null;
      document.getElementById("modiTit8").value =null;
      document.getElementById("modiName9").value =null;
      document.getElementById("modiTit9").value =null;
      document.getElementById("modiName10").value =null;
      document.getElementById("modiTit10").value =null;

      // Fill Existing Info
      // Fill Head
      var modiDocName=snapshot.child(curNum).child("DocumentName").val();
      document.getElementById("modiDocName").value =modiDocName;
      var modiProjectNum=snapshot.child(curNum).child("ProjectNumber").val();
      document.getElementById("modiProjectNum").value =modiProjectNum;
      var modiProjectName=snapshot.child(curNum).child("ProjectName").val();
      document.getElementById("modiProjectName").value =modiProjectName;
      document.getElementById("modiCirNum").value =curNum;

      // Fill List
      var modiName1=snapshot.child(curNum).child("1").child("Name").val();
      var modiTit1=snapshot.child(curNum).child("1").child("Title").val();
      document.getElementById("modiName1").value =modiName1;
      document.getElementById("modiTit1").value =modiTit1;
      var modiName2=snapshot.child(curNum).child("2").child("Name").val();
      var modiTit2=snapshot.child(curNum).child("2").child("Title").val();
      document.getElementById("modiName2").value =modiName2;
      document.getElementById("modiTit2").value =modiTit2;
      var modiName3=snapshot.child(curNum).child("3").child("Name").val();
      var modiTit3=snapshot.child(curNum).child("3").child("Title").val();
      document.getElementById("modiName3").value =modiName3;
      document.getElementById("modiTit3").value =modiTit3;
      var modiName4=snapshot.child(curNum).child("4").child("Name").val();
      var modiTit4=snapshot.child(curNum).child("4").child("Title").val();
      document.getElementById("modiName4").value =modiName4;
      document.getElementById("modiTit4").value =modiTit4;
      var modiName5=snapshot.child(curNum).child("5").child("Name").val();
      var modiTit5=snapshot.child(curNum).child("5").child("Title").val();
      document.getElementById("modiName5").value =modiName5;
      document.getElementById("modiTit5").value =modiTit5;
      var modiName6=snapshot.child(curNum).child("6").child("Name").val();
      var modiTit6=snapshot.child(curNum).child("6").child("Title").val();
      document.getElementById("modiName6").value =modiName6;
      document.getElementById("modiTit6").value =modiTit6;
      var modiName7=snapshot.child(curNum).child("7").child("Name").val();
      var modiTit7=snapshot.child(curNum).child("7").child("Title").val();
      document.getElementById("modiName7").value =modiName7;
      document.getElementById("modiTit7").value =modiTit7;
      var modiName8=snapshot.child(curNum).child("8").child("Name").val();
      var modiTit8=snapshot.child(curNum).child("8").child("Title").val();
      document.getElementById("modiName8").value =modiName8;
      document.getElementById("modiTit8").value =modiTit8;
      var modiName9=snapshot.child(curNum).child("9").child("Name").val();
      var modiTit9=snapshot.child(curNum).child("9").child("Title").val();
      document.getElementById("modiName9").value =modiName9;
      document.getElementById("modiTit9").value =modiTit9;
      var modiName10=snapshot.child(curNum).child("10").child("Name").val();
      var modiTit10=snapshot.child(curNum).child("10").child("Title").val();
      document.getElementById("modiName10").value =modiName10;
      document.getElementById("modiTit10").value =modiTit10;

      // QR Code
      var qrcode = new QRCode(document.getElementById("modi-qrcode"), {
        width: 100,
        height: 100,
      });
      qrcode.clear();
      qrcode.makeCode("https://doctracking-scanner.firebaseapp.com/?" + curNum,);
    } 
  })
}

function updateList(){
  var name1=document.getElementById("modiName1").value;
  var name1=name1.replace(/(^\s*)|(\s*$)/g, "");

  var name2=document.getElementById("modiName2").value;
  var name2=name2.replace(/(^\s*)|(\s*$)/g, "");

  var name3=document.getElementById("modiName3").value;
  var name3=name3.replace(/(^\s*)|(\s*$)/g, "");

  var name4=document.getElementById("modiName4").value;
  var name4=name4.replace(/(^\s*)|(\s*$)/g, "");

  var name5=document.getElementById("modiName5").value;
  var name5=name5.replace(/(^\s*)|(\s*$)/g, "");

  var name6=document.getElementById("modiName6").value;
  var name6=name6.replace(/(^\s*)|(\s*$)/g, "");

  var name7=document.getElementById("modiName7").value;
  var name7=name7.replace(/(^\s*)|(\s*$)/g, "");

  var name8=document.getElementById("modiName8").value;
  var name8=name8.replace(/(^\s*)|(\s*$)/g, "");

  var name9=document.getElementById("modiName9").value;
  var name9=name9.replace(/(^\s*)|(\s*$)/g, "");

  var name10=document.getElementById("modiName10").value;
  var name10=name10.replace(/(^\s*)|(\s*$)/g, "");

  var tit1=document.getElementById("modiTit1").value;
  var tit1=tit1.replace(/(^\s*)|(\s*$)/g, "");

  var tit2=document.getElementById("modiTit2").value;
  var tit2=tit2.replace(/(^\s*)|(\s*$)/g, "");

  var tit3=document.getElementById("modiTit3").value;
  var tit3=tit3.replace(/(^\s*)|(\s*$)/g, "");

  var tit4=document.getElementById("modiTit4").value;
  var tit4=tit4.replace(/(^\s*)|(\s*$)/g, "");

  var tit5=document.getElementById("modiTit5").value;
  var tit5=tit5.replace(/(^\s*)|(\s*$)/g, "");

  var tit6=document.getElementById("modiTit6").value;
  var tit6=tit6.replace(/(^\s*)|(\s*$)/g, "");

  var tit7=document.getElementById("modiTit7").value;
  var tit7=tit7.replace(/(^\s*)|(\s*$)/g, "");

  var tit8=document.getElementById("modiTit8").value;
  var tit8=tit8.replace(/(^\s*)|(\s*$)/g, "");

  var tit9=document.getElementById("modiTit9").value;
  var tit9=tit9.replace(/(^\s*)|(\s*$)/g, "");

  var tit10=document.getElementById("modiTit10").value;
  var tit10=tit10.replace(/(^\s*)|(\s*$)/g, "");

  var projectNum=document.getElementById("modiProjectNum").value;
  var projectNum=projectNum.replace(/(^\s*)|(\s*$)/g, "");
  var projectNum=projectNum.toUpperCase();

  var docName=document.getElementById("modiDocName").value;
  var docName=docName.replace(/(^\s*)|(\s*$)/g, "");
  var docName=docName.toUpperCase();

  var projectName=document.getElementById("modiProjectName").value;
  var projectName=projectName.replace(/(^\s*)|(\s*$)/g, "");
  var projectName=projectName.toUpperCase();

  var cirNum=document.getElementById("modiCirNum").value;
  var cirNum=cirNum.replace(/(^\s*)|(\s*$)/g, "");
  var cirNum=cirNum.toUpperCase();

  var userName=firebase.auth().currentUser.displayName;
  var creatorEmail=firebase.auth().currentUser.email;

  var firebaseRef = firebase.database().ref();
  var nowTime = new Date();
  var createTime=nowTime.toGMTString();
  var sheet = {
    "CreateTime":createTime,
    "Creator":userName,
    "CreatorEmail":creatorEmail,
    "ProjectNumber":projectNum,
    "ProjectName":projectName,
    "DocumentName":docName,
    "1":{
      "Name":name1,
      "Title":tit1,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "2":{
      "Name":name2,
      "Title":tit2,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "3":{
      "Name":name3,
      "Title":tit3,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "4":{
      "Name":name4,
      "Title":tit4,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "5":{
      "Name":name5,
      "Title":tit5,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "6":{
      "Name":name6,
      "Title":tit6,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "7":{
      "Name":name7,
      "Title":tit7,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "8":{
      "Name":name8,
      "Title":tit8,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "9":{
      "Name":name9,
      "Title":tit9,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
    "10":{
      "Name":name10,
      "Title":tit10,
      "IN":{
        "INCount":"0",
      },
      "OUT":{
        "OUTCount":"0",
      },
    },
  }
  firebaseRef.child(cirNum).set(sheet);

  // Page jump
  document.getElementById("logged-div").style.display="none";
  document.getElementById("task-div").style.display="none";
  document.getElementById("create-div").style.display="none";
  document.getElementById("header").style.display="none";
  document.getElementById("print-div").style.display="block";
  document.getElementById("modify-div").style.display="none";

  // Print sheet create
  document.getElementById("printConNum").innerHTML="CONTRACT "+projectNum;
  document.getElementById("printProjectName").innerHTML=projectName;
      
  var createDate =nowTime.toDateString()
  document.getElementById("printNum").innerHTML="CRF No. " + cirNum + " dated " + createDate;
      
  document.getElementById("printDocName").innerHTML=docName;

  document.getElementById("printName1").innerHTML=name1;
  document.getElementById("printName2").innerHTML=name2;
  document.getElementById("printName3").innerHTML=name3;
  document.getElementById("printName4").innerHTML=name4;
  document.getElementById("printName5").innerHTML=name5;
  document.getElementById("printName6").innerHTML=name6;
  document.getElementById("printName7").innerHTML=name7;
  document.getElementById("printName8").innerHTML=name8;
  document.getElementById("printName9").innerHTML=name9;
  document.getElementById("printName10").innerHTML=name10;
      
  document.getElementById("printTit1").innerHTML=tit1;
  document.getElementById("printTit2").innerHTML=tit2;
  document.getElementById("printTit3").innerHTML=tit3;
  document.getElementById("printTit4").innerHTML=tit4;
  document.getElementById("printTit5").innerHTML=tit5;
  document.getElementById("printTit6").innerHTML=tit6;
  document.getElementById("printTit7").innerHTML=tit7;
  document.getElementById("printTit8").innerHTML=tit8;
  document.getElementById("printTit9").innerHTML=tit9;
  document.getElementById("printTit10").innerHTML=tit10;
      
  document.getElementById("ps").innerHTML=
    '<p>Please send the document to next person after signature.</p>' +
    '<p>Please contact ' + userName + ', CWD at 2/F if there is any enquiries.</p>' +
    '<p>Please return to Ava Fung, CWD at 2/F when the last person signed.</p>';

  // QR Code
  document.getElementById("print-qrcode").innerHTML=null;
  var qrcode = new QRCode(document.getElementById("print-qrcode"), {
    width: 100,
    height: 100,
  });
  qrcode.clear();
  qrcode.makeCode("https://doctracking-scanner.firebaseapp.com/?" + cirNum,);
}


function markCompleted(){
  var curNum=window.taskNum;
  firebase.database().ref().child(curNum).child("Complete").set("Yes");
  window.alert("This circulation has been marked as complete!");

  toLogged();
}


function test(){
  document.getElementById("sheetList").innerHTML = null;
  // Show all Task in Table
  var firebaseRef = firebase.database().ref();
  firebaseRef.on('value', function(snapshot) {
    obj=snapshot.val()
    for (var x in obj){
      var lCreator=snapshot.child(x).child("Creator").val();
      var lDocName=snapshot.child(x).child("DocumentName").val();
      var lContractNumber=snapshot.child(x).child("ContractNumber").val();
      var lProjectName=snapshot.child(x).child("ProjectName").val();
      
      document.getElementById("sheetList").innerHTML += 
      '<div class="panel-group" id="panel-parent">'+
        '<div class="panel panel-default">'+
          '<div class="panel-heading">'
            '<a class="panel-title collapsed" data-toggle="collapse" data-parent="#panel-parent" href="#panel-x">test</a>'+
          '</div>'+
          '<div class="panel-group" id="panel-parent">'+
                '<div class="panel panel-default">'+
                  '<div class="panel-heading">'
                    '<a class="panel-title collapsed" data-toggle="collapse" data-parent="#panel-parent" href="#panel-x">test</a>'+
                  '</div>'+
                  '<div id="panel-x" class="panel-collapse collapse">'+
                    '<div class="panel-body">'+
                      '<h5>Creator: ' + lCreator + '</h5>'+
                      '<h5>Project: ' + lContractNumber + ' ' + lProjectName + '</h5>'+
                      '<h5>Document Name: ' + lDocName + '</h5>'+
                      '<br>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
          '</div>'

      // User1 Name
//      var u1Name=snapshot.child(x).child("01").child("Name").val();
//      var u1NameMark=x+"u1Name";
//      document.getElementById(u1NameMark).innerHTML = u1Name;
      // User1 IN Record
//      var u1In=snapshot.child(x).child("01").child("IN").val();
//      for (var x in u1In){
//        var inTime=snapshot.child("01").child("IN").child(x).child("Time").val();
//        var inRemark=snapshot.child("01").child("IN").child(x).child("Remark").val();
//        var u1InRecordMark=x+"u1InRecord";
//        document.getElementById(u1InRecordMark).innerHTML +=
 //         '<p>' + inTime + ' ' + inRemark + '</p>'+
//          '<br>'
//      }
      // User1 OUT Record
//      var u1Out=snapshot.child(x).child("01").child("OUT").val();
 //     for (var x in u1Out){
 //       var outTime=snapshot.child("01").child("OUT").child(x).child("Time").val();
 //       var outRemark=snapshot.child("01").child("OUT").child(x).child("Remark").val();
 //       var u1OutRecordMark=x+"u1OutRecord";
  //      document.getElementById(u1OutRecordMark).innerHTML +=
  //        '<p>' + outTime + ' ' + outRemark + '</p>'+
 //         '<br>'

    }
  });
}



      



