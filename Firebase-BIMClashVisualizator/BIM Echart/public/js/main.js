
// Page Control Function
function initApp() {

  document.getElementById("login").style.display = "block";
  document.getElementById("pSummary").style.display = "none";
  document.getElementById("setup").style.display = "none";
  document.getElementById("newReport").style.display = "none";
  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;
  document.getElementById("newReport").innerHTML = null;
  // Render Web Structure 
  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toAdd()" type="submit" class="btn btn-primary btn-sm btn-block">New Clash Report</button>' +
    '<br>' +
    '<button onclick="toSetup()" type="submit" class="btn btn-primary btn-sm btn-block">Setup Project</button>' +
    '<br>' +
    '<button onclick="signOut()" type="submit" class="btn btn-primary btn-sm btn-block">Sign Out</button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div id="tTable">' +
    '</div>' +
    '</div>';

  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      window.uEmail = user.email;
      toSummary();
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      // [END_EXCLUDE]
    }
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);

}

function toggleSignIn() {

  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut().then(function () {
      console.log("logged out!")
    }, function (error) {
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
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      window.uEmail = user.email;
      // [END_EXCLUDE]

    } else {
      // No user is signed in.
      document.getElementById("login").style.display = "block";
      document.getElementById("pSummary").style.display = "none";
      document.getElementById("setup").style.display = "none";
      document.getElementById("newReport").style.display = "none";

      document.getElementById("pSummary").innerHTML = null;
      document.getElementById("setup").innerHTML = null;
      document.getElementById("newReport").innerHTML = null;
    }
  })
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function (error) {
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

function signOut() {
  document.getElementById("login").style.display = "block";
  document.getElementById("pSummary").style.display = "none";
  document.getElementById("setup").style.display = "none";
  document.getElementById("newReport").style.display = "none";

  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;
  document.getElementById("create").innerHTML = null;
  document.getElementById("newReport").innerHTML = null;
  firebase.auth().signOut().then(function () {
    console.log("logged out!");
  }, function (error) {
    console.log(error.code);
    console.log(error.message);
  });
}

function toSummary() {
  document.getElementById("login").style.display = "none";
  document.getElementById("pSummary").style.display = "block";
  document.getElementById("setup").style.display = "none";
  document.getElementById("newReport").style.display = "none";
  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;
  // Render Summary Page
  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
    '</div>' +
    '<br>' +
    '<br>' +
    '<br>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="newReport()" id="newReportBTN" type="button" class="btn btn-primary btn-sm btn-block">New Clash Report</button>' +
    '<br>' +
    '<button onclick="toSetup()" type="button" class="btn btn-primary btn-sm btn-block">Setup Project</button>' +
    '<br>' +
    '<button onclick="signOut()" type="button" class="btn btn-outline-danger btn-sm btn-block">Sign Out</button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column">' +
    '<table class="table table-bordered table-hover table-condensed">' +
    '<thead id="tHead">' +
    '<tr>' +
    '<th>Clash Report Date</th>' +
    '<th>Hard Clash Number</th>' +
    '<th>Total Clash Number</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="tTable">' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {
    var obj = snapshot.val();
    for (var x in obj) {
      var pEmailList = snapshot.child(x).child("email").val();
      for (var i in pEmailList) {
        var pEmail = snapshot.child(x).child("email").child(i).val();
        if (pEmail == uEmail) {
          window.pNumber = x;
          window.pName = snapshot.child(x).child("pName").val();

          // Create Clash Report Data Array
          var dateSet = new Array();
          var allClashData = new Array();
          var hardClashData = new Array();
          // 遍历全部report
          var report = snapshot.child(x).val();
          for (var y in report) {
            var rAll = snapshot.child(x).child(y).child("all").child("total").val();
            var rHard = snapshot.child(x).child(y).child("hard").child("total").val();
            var rDate = y;
            if (rAll != null) {
              // Update Clash Report Date Array
              dateSet.push(rDate);
              // Update Clash Number Array
              hardClashData.push(rHard);
              allClashData.push(rAll);
              // Create Table
              document.getElementById("tTable").innerHTML +=
                '<tr onclick="jump(this)">' +
                '<td>' + rDate + '</td>' +
                '<td>' + rHard + '</td>' +
                '<td>' + rAll + '</td>' +
                '</tr>';
            }
          }
          // Init Chart DOM
          var myChart = echarts.init(document.getElementById("tChart"));
          // Chart Dataset
          var option = {
            title: {
              text: pNumber + ' Total & Hard Clash Number Summary',
              textStyle: {
                color: "#666666"
              },
              subtextStyle: {
                color: "#999999"
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              }
            },
            legend: {
              right: '100',
              data: ['Total Clashes', 'Hard Clashes']
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                rotate: '45',
                interval: '0'
              },
              boundaryGap: false,
              data: dateSet
            },
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Total Clashes',
                type: 'line',
                areaStyle: {},
                data: allClashData
              },
              {
                name: 'Hard Clashes',
                type: 'line',
                areaStyle: {},
                data: hardClashData
              },
            ],
            color: [
              "#3fb1e3",
              "#6be6c1",
              "#626c91",
              "#a0a7e6",
              "#c4ebad",
              "#96dee8"
            ],
            backgroundColor: "rgba(252,252,252,0)",
            textStyle: {},
            line: {
              itemStyle: {
                normal: {
                  borderWidth: "2"
                }
              },
              lineStyle: {
                normal: {
                  width: "3"
                }
              },
              symbolSize: "8",
              symbol: "emptyCircle",
              smooth: false
            }
          };
          myChart.setOption(option);
        }
      }
    }
  })
}

function jump(jump) {
  jumpDate = jump.childNodes[0].innerHTML;

  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
    '<br>' +
    '<button onclick="byLevel()" type="submit" class="btn btn-primary btn-sm btn-block"> By Level </button>' +
    '<br>' +
    '<button onclick="bsDetails()" type="submit" class="btn btn-primary btn-sm btn-block"> BS Details </button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column">' +
    '<table class="table table-bordered table-hover table-condensed">' +
    '<thead id="tHead">' +
    '</thead>' +
    '<tbody id="tTable">' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {
    var cAll = snapshot.child(pNumber).child(jumpDate).child("all").val();
    var cHard = snapshot.child(pNumber).child(jumpDate).child("hard").val();
    // Create Clash Report Data Array
    var discSet = ["ARvsAR", "ARvsAS", "ARvsBS", "ARvsCV", "ARvsST", "ARvsUU", "ASvsAS", "BSvsAS", "BSvsBS", "BSvsCV", "CVvsAS", "CVvsCV", "STvsAS", "STvsBS", "STvsCV", "STvsST", "STvsUU", "UUvsAS", "UUvsBS", "UUvsCV", "UUvsUU"];
    var hardSet = new Array();
    var allSet = new Array();
    // Get X Axis and All clash array
    for (var x in cAll) {
      if (x != "total") {
        var dAll = snapshot.child(pNumber).child(jumpDate).child("all").child(x).val();
        allSet.push(dAll);
      }
    }
    for (var y in cHard) {
      if (y != "total") {
        var dHard = snapshot.child(pNumber).child(jumpDate).child("hard").child(y).val();
        hardSet.push(dHard);
      }
    }

    // Create Echart
    var myChart = echarts.init(document.getElementById("tChart"));
    // Chart Dataset
    var option = {
      title: {
        text: pNumber + 'Total & Hard Clash Number on ' + jumpDate,
        textStyle: {
          color: "#666666"
        },
        subtextStyle: {
          color: "#999999"
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        right: '100',
        data: ['Total Clashes', 'Hard Clashes']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: '60',
          interval: '0'
        },
        data: discSet
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total Clashes',
          type: 'bar',
          data: allSet
        },
        {
          name: 'Hard Clashes',
          type: 'bar',
          data: hardSet
        },
      ],
      color: [
        "#3fb1e3",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
      ],
      backgroundColor: "rgba(252,252,252,0)",
      textStyle: {},
      line: {
        itemStyle: {
          normal: {
            borderWidth: "2"
          }
        },
        lineStyle: {
          normal: {
            width: "3"
          }
        },
        symbolSize: "8",
        symbol: "emptyCircle",
        smooth: false
      }
    };
    myChart.setOption(option);

    // Create Table
    // Omit Table Head
    // Table Contents
    document.getElementById("tTable").innerHTML =
      '<tr>' +
      '<td> </td>' +
      '<td> AR </td>' +
      '<td> ST </td>' +
      '<td> UU </td>' +
      '<td> BS </td>' +
      '<td> CV </td>' +
      '<td> AS </td>' +
      '</tr>' +
      '<tr>' +
      '<td> AR </td>' +
      '<td>' + hardSet[0] + '/' + allSet[0] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> ST </td>' +
      '<td>' + hardSet[4] + '/' + allSet[4] + '</td>' +
      '<td>' + hardSet[15] + '/' + allSet[15] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> UU </td>' +
      '<td>' + hardSet[5] + '/' + allSet[5] + '</td>' +
      '<td>' + hardSet[16] + '/' + allSet[16] + '</td>' +
      '<td>' + hardSet[20] + '/' + allSet[20] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> BS </td>' +
      '<td>' + hardSet[3] + '/' + allSet[3] + '</td>' +
      '<td>' + hardSet[13] + '/' + allSet[13] + '</td>' +
      '<td>' + hardSet[18] + '/' + allSet[18] + '</td>' +
      '<td>' + hardSet[8] + '/' + allSet[8] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> CV </td>' +
      '<td>' + hardSet[2] + '/' + allSet[2] + '</td>' +
      '<td>' + hardSet[14] + '/' + allSet[14] + '</td>' +
      '<td>' + hardSet[19] + '/' + allSet[19] + '</td>' +
      '<td>' + hardSet[9] + '/' + allSet[9] + '</td>' +
      '<td>' + hardSet[11] + '/' + allSet[11] + '</td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> AS </td>' +
      '<td>' + hardSet[1] + '/' + allSet[1] + '</td>' +
      '<td>' + hardSet[12] + '/' + allSet[12] + '</td>' +
      '<td>' + hardSet[17] + '/' + allSet[17] + '</td>' +
      '<td>' + hardSet[7] + '/' + allSet[7] + '</td>' +
      '<td>' + hardSet[10] + '/' + allSet[10] + '</td>' +
      '<td>' + hardSet[6] + '/' + allSet[6] + '</td>' +
      '</tr>';
  })
}

function byLevel() {
  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
    '<br>' +
    '<button onclick="byLevel()" type="submit" class="btn btn-primary btn-sm btn-block"> By Level </button>' +
    '<br>' +
    '<button onclick="bsDetails()" type="submit" class="btn btn-primary btn-sm btn-block"> BS Details </button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column">' +
    '<table class="table table-bordered table-hover table-condensed">' +
    '<thead id="tHead">' +
    '<tr>' +
    '<th>Level</th>' +
    '<th>Hard Clash Number</th>' +
    '<th>Total Clash Number</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="tTable">' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {
    var UUCheck = snapshot.child(pNumber).child("dict").child("UU").val();
    var level = snapshot.child(pNumber).child("dict").child("level").val();
    var lHard = snapshot.child(pNumber).child(jumpDate).child("hardLevel").val();
    var lAll = snapshot.child(pNumber).child(jumpDate).child("allLevel").val();

    // Create Array
    var levelSet = new Array();
    var lHardSet = new Array();
    var lAllSet = new Array();

    // Get all array
    for (var x in level) {
      // Get all array
      var lName = snapshot.child(pNumber).child("dict").child("level").child(x).child("name").val();
      levelSet.push(lName);
    }
    for (var y in lHard) {
      var lHardNum = snapshot.child(pNumber).child(jumpDate).child("hardLevel").child(y).val();
      lHardSet.push(lHardNum);
    }
    for (var z in lAll) {
      var lAllNum = snapshot.child(pNumber).child(jumpDate).child("allLevel").child(z).val();
      lAllSet.push(lAllNum);
    }
    // Based on UU included or not to create chart and table
    if (UUCheck) {
      // Create Table
      var UUAll = snapshot.child(pNumber).child(jumpDate).child("UU").child("all").val();
      var UUHard = snapshot.child(pNumber).child(jumpDate).child("UU").child("hard").val();
      document.getElementById("tTable").innerHTML =
        '<tr onclick="jumpLevel(this)">' +
        '<td>UU</td>' +
        '<td>' + UUHard + '</td>' +
        '<td>' + UUAll + '</td>' +
        '</tr>';
      var lLength = levelSet.length;
      for (i = 0; i < lLength; i++) {
        document.getElementById("tTable").innerHTML +=
          '<tr onclick="jumpLevel(this)">' +
          '<td>' + levelSet[i] + '</td>' +
          '<td>' + lHardSet[i] + '</td>' +
          '<td>' + lAllSet[i] + '</td>' +
          '</tr>';
      }
      // Add UU into dataset
      levelSet.unshift("UU");
      lHardSet.unshift(UUHard);
      lAllSet.unshift(UUAll);
    } else {
      // Create Table
      var lLength = levelSet.length;
      for (i = 0; i < lLength; i++) {
        document.getElementById("tTable").innerHTML +=
          '<tr onclick="jump(this)">' +
          '<td>' + levelSet[i] + '</td>' +
          '<td>' + lHardSet[i] + '</td>' +
          '<td>' + lAllSet[i] + '</td>' +
          '</tr>';
      }
    }

    // Create Echart
    var myChart = echarts.init(document.getElementById("tChart"));
    // Chart Dataset
    var option = {
      title: {
        text: pNumber + ' Total Clash & Hard Clash Number on ' + jumpDate,
        textStyle: {
          color: "#666666"
        },
        subtextStyle: {
          color: "#999999"
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        right: '100',
        data: ['Total Clashes', 'Hard Clashes']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: '0'
        },
        data: levelSet
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total Clashes',
          type: 'bar',
          data: lAllSet
        },
        {
          name: 'Hard Clashes',
          type: 'bar',
          data: lHardSet
        },
      ],
      color: [
        "#3fb1e3",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
      ],
      backgroundColor: "rgba(252,252,252,0)",
      textStyle: {},
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
      var levelName = params.name;
      var levelIndex = params.dataIndex;
      jumpChartLevel(levelName, levelIndex);
    });
  })
}

function byDisc() {
  document.getElementById("login").style.display = "none";
  document.getElementById("pSummary").style.display = "block";
  document.getElementById("setup").style.display = "none";
  document.getElementById("newReport").style.display = "none";
  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;

  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
    '<br>' +
    '<button onclick="byLevel()" type="submit" class="btn btn-primary btn-sm btn-block"> By Level </button>' +
    '<br>' +
    '<button onclick="bsDetails()" type="submit" class="btn btn-primary btn-sm btn-block"> BS Details </button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column">' +
    '<table class="table table-bordered table-hover table-condensed">' +
    '<thead id="tHead">' +
    '</thead>' +
    '<tbody id="tTable">' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {
    var cAll = snapshot.child(pNumber).child(jumpDate).child("all").val();
    var cHard = snapshot.child(pNumber).child(jumpDate).child("hard").val();
    // Create Clash Report Data Array
    var discSet = ["ARvsAR", "ARvsAS", "ARvsBS", "ARvsCV", "ARvsST", "ARvsUU", "ASvsAS", "BSvsAS", "BSvsBS", "BSvsCV", "CVvsAS", "CVvsCV", "STvsAS", "STvsBS", "STvsCV", "STvsST", "STvsUU", "UUvsAS", "UUvsBS", "UUvsCV", "UUvsUU"];
    var hardSet = new Array();
    var allSet = new Array();
    // Get X Axis and All clash array
    for (var x in cAll) {
      if (x != "total") {
        var dAll = snapshot.child(pNumber).child(jumpDate).child("all").child(x).val();
        allSet.push(dAll);
      }
    }
    for (var y in cHard) {
      if (y != "total") {
        var dHard = snapshot.child(pNumber).child(jumpDate).child("hard").child(y).val();
        hardSet.push(dHard);
      }
    }

    // Create Echart
    var myChart = echarts.init(document.getElementById("tChart"));
    // Chart Dataset
    var option = {
      title: {
        text: pNumber + ' Total Clash & Hard Clash Number on ' + jumpDate,
        textStyle: {
          color: "#666666"
        },
        subtextStyle: {
          color: "#999999"
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        right: '100',
        data: ['Total Clashes', 'Hard Clashes']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: '60',
          interval: '0'
        },
        data: discSet
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total Clashes',
          type: 'bar',
          data: allSet
        },
        {
          name: 'Hard Clashes',
          type: 'bar',
          data: hardSet
        },
      ],
      color: [
        "#3fb1e3",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
      ],
      backgroundColor: "rgba(252,252,252,0)",
      textStyle: {},
    };
    myChart.setOption(option);

    // Create Table
    // Omit Table
    // Table Contents
    document.getElementById("tTable").innerHTML =
      '<tr>' +
      '<td> </td>' +
      '<td> AR </td>' +
      '<td> ST </td>' +
      '<td> UU </td>' +
      '<td> BS </td>' +
      '<td> CV </td>' +
      '<td> AS </td>' +
      '</tr>' +
      '<tr>' +
      '<td> AR </td>' +
      '<td>' + hardSet[0] + '/' + allSet[0] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> ST </td>' +
      '<td>' + hardSet[4] + '/' + allSet[4] + '</td>' +
      '<td>' + hardSet[15] + '/' + allSet[15] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> UU </td>' +
      '<td>' + hardSet[5] + '/' + allSet[5] + '</td>' +
      '<td>' + hardSet[16] + '/' + allSet[16] + '</td>' +
      '<td>' + hardSet[20] + '/' + allSet[20] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> BS </td>' +
      '<td>' + hardSet[3] + '/' + allSet[3] + '</td>' +
      '<td>' + hardSet[13] + '/' + allSet[13] + '</td>' +
      '<td>' + hardSet[18] + '/' + allSet[18] + '</td>' +
      '<td>' + hardSet[8] + '/' + allSet[8] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> CV </td>' +
      '<td>' + hardSet[2] + '/' + allSet[2] + '</td>' +
      '<td>' + hardSet[14] + '/' + allSet[14] + '</td>' +
      '<td>' + hardSet[19] + '/' + allSet[19] + '</td>' +
      '<td>' + hardSet[9] + '/' + allSet[9] + '</td>' +
      '<td>' + hardSet[11] + '/' + allSet[11] + '</td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> AS </td>' +
      '<td>' + hardSet[1] + '/' + allSet[1] + '</td>' +
      '<td>' + hardSet[12] + '/' + allSet[12] + '</td>' +
      '<td>' + hardSet[17] + '/' + allSet[17] + '</td>' +
      '<td>' + hardSet[7] + '/' + allSet[7] + '</td>' +
      '<td>' + hardSet[10] + '/' + allSet[10] + '</td>' +
      '<td>' + hardSet[6] + '/' + allSet[6] + '</td>' +
      '</tr>';
  })
}

function bsDetails() {
  document.getElementById("pSummary").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
    '<br>' +
    '<button onclick="byLevel()" type="submit" class="btn btn-primary btn-sm btn-block"> By Level </button>' +
    '<br>' +
    '<button onclick="bsDetails()" type="submit" class="btn btn-primary btn-sm btn-block"> BS Details </button>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column">' +
    '<table class="table table-bordered table-hover table-condensed">' +
    '<thead id="tHead">' +
    '</thead>' +
    '<tbody id="tTable">' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {
    var bsAll = snapshot.child(pNumber).child(jumpDate).child("allBS").val();
    var bsHard = snapshot.child(pNumber).child(jumpDate).child("hardBS").val();

    // Create Clash Report Data Array
    var bsSet = ["MVACvsMVAC", "MVACvsFS", "MVACvsEL", "MVACvsPL", "MVACvsDR", "FSvsFS", "FSvsEL", "FSvsPL", "FSvsDR", "ELvsEL", "ELvsPL", "ELvsDR", "PLvsPL", "PLvsDR", "DRvsDR"];
    var bsHardSet = new Array();
    var bsAllSet = new Array();
    for (var x in bsAll) {
      var bsAllNum = snapshot.child(pNumber).child(jumpDate).child("allBS").child(x).val();
      bsAllSet.push(bsAllNum);
    }
    for (var y in bsHard) {
      var bsHardNum = snapshot.child(pNumber).child(jumpDate).child("hardBS").child(y).val();
      bsHardSet.push(bsHardNum);
    }

    // Create Echart
    var myChart = echarts.init(document.getElementById("tChart"));
    // Chart Dataset
    var option = {
      title: {
        text: pNumber + ' BS Total Clash & Hard Clash Number on ' + jumpDate,
        textStyle: {
          color: "#666666"
        },
        subtextStyle: {
          color: "#999999"
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        right: '100',
        data: ['Total Clashes', 'Hard Clashes']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: '60',
          interval: '0'
        },
        data: bsSet
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total Clashes',
          type: 'bar',
          data: bsAllSet
        },
        {
          name: 'Hard Clashes',
          type: 'bar',
          data: bsHardSet
        },
      ],
      color: [
        "#3fb1e3",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
      ],
      backgroundColor: "rgba(252,252,252,0)",
      textStyle: {},
    };
    myChart.setOption(option);

    // Create Table
    // Omit Table
    // Table Contents
    document.getElementById("tTable").innerHTML =
      '<tr>' +
      '<td> </td>' +
      '<td> MVAC </td>' +
      '<td> FS </td>' +
      '<td> EL </td>' +
      '<td> PL </td>' +
      '<td> DR </td>' +
      '</tr>' +
      '<tr>' +
      '<td> MVAC </td>' +
      '<td>' + bsHardSet[0] + '/' + bsAllSet[0] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> FS </td>' +
      '<td>' + bsHardSet[1] + '/' + bsAllSet[1] + '</td>' +
      '<td>' + bsHardSet[5] + '/' + bsAllSet[5] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> EL </td>' +
      '<td>' + bsHardSet[2] + '/' + bsAllSet[2] + '</td>' +
      '<td>' + bsHardSet[6] + '/' + bsAllSet[6] + '</td>' +
      '<td>' + bsHardSet[9] + '/' + bsAllSet[9] + '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> PL </td>' +
      '<td>' + bsHardSet[3] + '/' + bsAllSet[3] + '</td>' +
      '<td>' + bsHardSet[7] + '/' + bsAllSet[7] + '</td>' +
      '<td>' + bsHardSet[10] + '/' + bsAllSet[10] + '</td>' +
      '<td>' + bsHardSet[12] + '/' + bsAllSet[12] + '</td>' +
      '<td> </td>' +
      '</tr>' +
      '<tr>' +
      '<td> DR </td>' +
      '<td>' + bsHardSet[4] + '/' + bsAllSet[4] + '</td>' +
      '<td>' + bsHardSet[8] + '/' + bsAllSet[8] + '</td>' +
      '<td>' + bsHardSet[11] + '/' + bsAllSet[11] + '</td>' +
      '<td>' + bsHardSet[13] + '/' + bsAllSet[13] + '</td>' +
      '<td>' + bsHardSet[14] + '/' + bsAllSet[14] + '</td>' +
      '</tr>';
  })
}

function jumpLevel(level) {
  var levelName = level.childNodes[0].innerHTML;
  if (levelName == "UU") {
    alert("UU Clash Details cannot be shown.");
  } else {
    document.getElementById("pSummary").innerHTML =
      '<div class="container">' +
      '<div class="row clearfix">' +
      '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
      '</div>' +
      '<div class="col-md-2 column">' +
      '<br>' +
      '<button onclick="byLevel()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
      '<br>' +
      '</div>' +
      '</div>' +
      '<div class="container">' +
      '<div class="row clearfix">' +
      '<div class="col-md-12 column">' +
      '<table class="table table-bordered table-hover table-condensed">' +
      '<thead id="tHead">' +
      '<tr>' +
      '<th>Level</th>' +
      '<th>Hard Clash Number</th>' +
      '<th>Total Clash Number</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tTable">' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    var firebaseRef = firebase.database().ref();
    firebaseRef.once('value').then(function (snapshot) {
      var leveldict = snapshot.child(pNumber).child("dict").child("level").val();
      for (var i in leveldict) {
        var levelPair = snapshot.child(pNumber).child("dict").child("level").child(i).child("name").val();
        if (levelName == levelPair) {
          window.checkLevel = i
        }
      }

      var cAll = snapshot.child(pNumber).child(jumpDate).child("allLevelDetail").child(checkLevel).val();
      var cHard = snapshot.child(pNumber).child(jumpDate).child("hardLevelDetail").child(checkLevel).val();
      // Create Clash Report Data Array
      var discSet = ["ARvsAR", "ARvsAS", "ARvsBS", "ARvsCV", "ARvsST", "ARvsUU", "ASvsAS", "BSvsAS", "BSvsBS", "BSvsCV", "CVvsAS", "CVvsCV", "STvsAS", "STvsBS", "STvsCV", "STvsST", "STvsUU", "UUvsAS", "UUvsBS", "UUvsCV", "UUvsUU"];
      var hardSet = new Array();
      var allSet = new Array();
      // Get X Axis and All clash array
      for (var x in cAll) {
        var dAll = snapshot.child(pNumber).child(jumpDate).child("allLevelDetail").child(checkLevel).child(x).val();
        allSet.push(dAll);
      }
      for (var y in cHard) {
        var dHard = snapshot.child(pNumber).child(jumpDate).child("hardLevelDetail").child(checkLevel).child(y).val();
        hardSet.push(dHard);
      }

      // Create Echart
      var myChart = echarts.init(document.getElementById("tChart"));
      // Chart Dataset
      var option = {
        title: {
          text: pNumber + ' Total & Hard Clash Number at ' + levelName,
          textStyle: {
            color: "#666666"
          },
          subtextStyle: {
            color: "#999999"
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: '100',
          data: ['Total Clashes', 'Hard Clashes']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: '60',
            interval: '0'
          },
          data: discSet
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Total Clashes',
            type: 'bar',
            data: allSet
          },
          {
            name: 'Hard Clashes',
            type: 'bar',
            data: hardSet
          },
        ],
        color: [
          "#3fb1e3",
          "#6be6c1",
          "#626c91",
          "#a0a7e6",
          "#c4ebad",
          "#96dee8"
        ],
        backgroundColor: "rgba(252,252,252,0)",
        textStyle: {},
      };
      myChart.setOption(option);

      // Create Table
      // Table Contents
      document.getElementById("tHead").innerHTML = null;
      document.getElementById("tTable").innerHTML =
        '<tr>' +
        '<td> </td>' +
        '<td> AR </td>' +
        '<td> ST </td>' +
        '<td> UU </td>' +
        '<td> BS </td>' +
        '<td> CV </td>' +
        '<td> AS </td>' +
        '</tr>' +
        '<tr>' +
        '<td> AR </td>' +
        '<td>' + hardSet[0] + '/' + allSet[0] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> ST </td>' +
        '<td>' + hardSet[4] + '/' + allSet[4] + '</td>' +
        '<td>' + hardSet[15] + '/' + allSet[15] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> UU </td>' +
        '<td>' + hardSet[5] + '/' + allSet[5] + '</td>' +
        '<td>' + hardSet[16] + '/' + allSet[16] + '</td>' +
        '<td>' + hardSet[20] + '/' + allSet[20] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> BS </td>' +
        '<td>' + hardSet[3] + '/' + allSet[3] + '</td>' +
        '<td>' + hardSet[13] + '/' + allSet[13] + '</td>' +
        '<td>' + hardSet[18] + '/' + allSet[18] + '</td>' +
        '<td>' + hardSet[8] + '/' + allSet[8] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> CV </td>' +
        '<td>' + hardSet[2] + '/' + allSet[2] + '</td>' +
        '<td>' + hardSet[14] + '/' + allSet[14] + '</td>' +
        '<td>' + hardSet[19] + '/' + allSet[19] + '</td>' +
        '<td>' + hardSet[9] + '/' + allSet[9] + '</td>' +
        '<td>' + hardSet[11] + '/' + allSet[11] + '</td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> AS </td>' +
        '<td>' + hardSet[1] + '/' + allSet[1] + '</td>' +
        '<td>' + hardSet[12] + '/' + allSet[12] + '</td>' +
        '<td>' + hardSet[17] + '/' + allSet[17] + '</td>' +
        '<td>' + hardSet[7] + '/' + allSet[7] + '</td>' +
        '<td>' + hardSet[10] + '/' + allSet[10] + '</td>' +
        '<td>' + hardSet[6] + '/' + allSet[6] + '</td>' +
        '</tr>';
    })
  }
}

function jumpChartLevel(levelName, levelIndex){
  if (levelName == "UU") {
    alert("UU Clash Details cannot be shown.");
  } else {
    document.getElementById("pSummary").innerHTML =
      '<div class="container">' +
      '<div class="row clearfix">' +
      '<div class="col-md-10 column" id="tChart" style="width: 550px; height: 400px; margin: 0 auto">' +
      '</div>' +
      '<div class="col-md-2 column">' +
      '<br>' +
      '<button onclick="byLevel()" type="submit" class="btn btn-outline-info btn-sm btn-block"> <- Back </button>' +
      '<br>' +
      '</div>' +
      '</div>' +
      '<div class="container">' +
      '<div class="row clearfix">' +
      '<div class="col-md-12 column">' +
      '<table class="table table-bordered table-hover table-condensed">' +
      '<thead id="tHead">' +
      '<tr>' +
      '<th>Level</th>' +
      '<th>Hard Clash Number</th>' +
      '<th>Total Clash Number</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="tTable">' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    var firebaseRef = firebase.database().ref();
    firebaseRef.once('value').then(function (snapshot) {
      var UUStr = snapshot.child(pNumber).child("dict").child("UU").val();
      var UUCheck = (/true/i).test(UUStr)
      var leveldict = snapshot.child(pNumber).child("dict").child("level").val();
      if(UUCheck){
        var levelAlias = "L0"+levelIndex;
      }else{
        levelIndex++;
        var levelAlias = "L0"+levelIndex;
      }
      window.checkLevel = snapshot.child(pNumber).child("dict").child("level").child(levelAlias).val();
      window.levelName = snapshot.child(pNumber).child("dict").child("level").child(levelAlias).child("name").val();

      var cAll = snapshot.child(pNumber).child(jumpDate).child("allLevelDetail").child(levelAlias).val();
      var cHard = snapshot.child(pNumber).child(jumpDate).child("hardLevelDetail").child(levelAlias).val();
      // Create Clash Report Data Array
      var discSet = ["ARvsAR", "ARvsAS", "ARvsBS", "ARvsCV", "ARvsST", "ARvsUU", "ASvsAS", "BSvsAS", "BSvsBS", "BSvsCV", "CVvsAS", "CVvsCV", "STvsAS", "STvsBS", "STvsCV", "STvsST", "STvsUU", "UUvsAS", "UUvsBS", "UUvsCV", "UUvsUU"];
      var hardSet = new Array();
      var allSet = new Array();
      // Get X Axis and All clash array
      for (var x in cAll) {
        var dAll = snapshot.child(pNumber).child(jumpDate).child("allLevelDetail").child(levelAlias).child(x).val();
        allSet.push(dAll);
      }
      for (var y in cHard) {
        var dHard = snapshot.child(pNumber).child(jumpDate).child("hardLevelDetail").child(levelAlias).child(y).val();
        hardSet.push(dHard);
      }

      // Create Echart
      var myChart = echarts.init(document.getElementById("tChart"));
      // Chart Dataset
      var option = {
        title: {
          text: pNumber + ' Total & Hard Clash Number at ' + levelName,
          textStyle: {
            color: "#666666"
          },
          subtextStyle: {
            color: "#999999"
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: '100',
          data: ['Total Clashes', 'Hard Clashes']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: '60',
            interval: '0'
          },
          data: discSet
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Total Clashes',
            type: 'bar',
            data: allSet
          },
          {
            name: 'Hard Clashes',
            type: 'bar',
            data: hardSet
          },
        ],
        color: [
          "#3fb1e3",
          "#6be6c1",
          "#626c91",
          "#a0a7e6",
          "#c4ebad",
          "#96dee8"
        ],
        backgroundColor: "rgba(252,252,252,0)",
        textStyle: {},
      };
      myChart.setOption(option);

      // Create Table
      // Table Contents
      document.getElementById("tHead").innerHTML = null;
      document.getElementById("tTable").innerHTML =
        '<tr>' +
        '<td> </td>' +
        '<td> AR </td>' +
        '<td> ST </td>' +
        '<td> UU </td>' +
        '<td> BS </td>' +
        '<td> CV </td>' +
        '<td> AS </td>' +
        '</tr>' +
        '<tr>' +
        '<td> AR </td>' +
        '<td>' + hardSet[0] + '/' + allSet[0] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> ST </td>' +
        '<td>' + hardSet[4] + '/' + allSet[4] + '</td>' +
        '<td>' + hardSet[15] + '/' + allSet[15] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> UU </td>' +
        '<td>' + hardSet[5] + '/' + allSet[5] + '</td>' +
        '<td>' + hardSet[16] + '/' + allSet[16] + '</td>' +
        '<td>' + hardSet[20] + '/' + allSet[20] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> BS </td>' +
        '<td>' + hardSet[3] + '/' + allSet[3] + '</td>' +
        '<td>' + hardSet[13] + '/' + allSet[13] + '</td>' +
        '<td>' + hardSet[18] + '/' + allSet[18] + '</td>' +
        '<td>' + hardSet[8] + '/' + allSet[8] + '</td>' +
        '<td> </td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> CV </td>' +
        '<td>' + hardSet[2] + '/' + allSet[2] + '</td>' +
        '<td>' + hardSet[14] + '/' + allSet[14] + '</td>' +
        '<td>' + hardSet[19] + '/' + allSet[19] + '</td>' +
        '<td>' + hardSet[9] + '/' + allSet[9] + '</td>' +
        '<td>' + hardSet[11] + '/' + allSet[11] + '</td>' +
        '<td> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> AS </td>' +
        '<td>' + hardSet[1] + '/' + allSet[1] + '</td>' +
        '<td>' + hardSet[12] + '/' + allSet[12] + '</td>' +
        '<td>' + hardSet[17] + '/' + allSet[17] + '</td>' +
        '<td>' + hardSet[7] + '/' + allSet[7] + '</td>' +
        '<td>' + hardSet[10] + '/' + allSet[10] + '</td>' +
        '<td>' + hardSet[6] + '/' + allSet[6] + '</td>' +
        '</tr>';
    })
  }
}

function toSetup() {
  document.getElementById("login").style.display = "none";
  document.getElementById("pSummary").style.display = "none";
  document.getElementById("setup").style.display = "block";
  document.getElementById("newReport").style.display = "none";

  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;

  // Render the div
  document.getElementById("setup").innerHTML =
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-12 column" style="margin: 0 auto">' +
    '<h5>Project Number: ' + pNumber + '</h5>' +
    '<h5>Project Name: ' + pName + '</h5>' +
    '<br>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="container">' +
    '<br>' +
    '<h5>Level Setup <small>(please input height in millimeter)</small>:</h5>' +
    '<label><input type="checkbox" id="UUCheck">UU elements included in this project</label>' +
    '<div class="row clearfix">' +
    '<div class="col-md-6 column">' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L01</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName01">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight01">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L02</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName02">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight02">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L03</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName03">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight03">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L04</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName04">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight04">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L05</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName05">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight05">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-6 column">' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L06</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName06">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight06">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L07</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName07">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight07">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L08</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName08">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight08">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L09</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName09">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight09">' +
    '</div>' +
    '</form>' +
    '<form>' +
    '<div class="input-group mb-3 input-group-sm">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text">L10</span>' +
    '</div>' +
    '<input type="text" class="form-control" placeholder="Level Name" id="levelName10">' +
    '<input type="text" class="form-control" placeholder="Level Height" id="levelHeight10">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="container">' +
    '<div>' +
    '<br>' +
    '<h5>Discipline Setup:</h5>' +
    '</div>' +
    '<div class="row clearfix">' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="AR01">AR01:</label>' +
    '<input class="form-control" id="AR01" placeholder="AR" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR02">AR02:</label>' +
    '<input class="form-control" id="AR02">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR03">AR03:</label>' +
    '<input class="form-control" id="AR03">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR04">AR04:</label>' +
    '<input class="form-control" id="AR04">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR05">AR05:</label>' +
    '<input class="form-control" id="AR05">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR06">AR06:</label>' +
    '<input class="form-control" id="AR06">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR7">AR7:</label>' +
    '<input class="form-control" id="AR7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR8">AR8:</label>' +
    '<input class="form-control" id="AR8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AR9">AR9:</label>' +
    '<input class="form-control" id="AR9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="ST1">ST1:</label>' +
    '<input class="form-control" id="ST" placeholder="ST" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST2">ST2:</label>' +
    '<input class="form-control" id="ST2">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST3">ST3:</label>' +
    '<input class="form-control" id="ST3">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST4">ST4:</label>' +
    '<input class="form-control" id="ST4">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST5">ST5:</label>' +
    '<input class="form-control" id="ST5" >' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST6">ST6:</label>' +
    '<input class="form-control" id="ST6">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST7">ST7:</label>' +
    '<input class="form-control" id="ST7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST8">ST8:</label>' +
    '<input class="form-control" id="ST8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="ST9">ST9:</label>' +
    '<input class="form-control" id="ST9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="UU1">UU1:</label>' +
    '<input class="form-control" id="UU1" placeholder="UU" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU2">UU2:</label>' +
    '<input class="form-control" id="UU2">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU3">UU3:</label>' +
    '<input class="form-control" id="UU3">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU4">UU4:</label>' +
    '<input class="form-control" id="UU4">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU5">UU5:</label>' +
    '<input class="form-control" id="UU5">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU6">UU6:</label>' +
    '<input class="form-control" id="UU6">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU7">UU7:</label>' +
    '<input class="form-control" id="UU7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU8">UU8:</label>' +
    '<input class="form-control" id="UU8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="UU9">UU9:</label>' +
    '<input class="form-control" id="UU9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="BS1">BS1:</label>' +
    '<input class="form-control" id="BS1" placeholder="BS" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS2">BS2:</label>' +
    '<input class="form-control" id="BS2" placeholder="MVAC" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS3">BS3:</label>' +
    '<input class="form-control" id="BS3" placeholder="FS" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS4">BS4:</label>' +
    '<input class="form-control" id="ABS4" placeholder="EL" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS5">BS5:</label>' +
    '<input class="form-control" id="BS5" placeholder="PL" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS6">BS6:</label>' +
    '<input class="form-control" id="BS6" placeholder="DR" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS7">BS7:</label>' +
    '<input class="form-control" id="BS7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS8">BS8:</label>' +
    '<input class="form-control" id="BS8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="BS9">BS9:</label>' +
    '<input class="form-control" id="BS9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="CV1">CV1:</label>' +
    '<input class="form-control" id="CV1" placeholder="CV" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV2">CV2:</label>' +
    '<input class="form-control" id="CV2">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV3">CV3:</label>' +
    '<input class="form-control" id="CV3">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV4">CV4:</label>' +
    '<input class="form-control" id="CV4">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV5">CV5:</label>' +
    '<input class="form-control" id="CV5">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV6">CV6:</label>' +
    '<input class="form-control" id="CV6">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV7">CV7:</label>' +
    '<input class="form-control" id="CV7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV8">CV8:</label>' +
    '<input class="form-control" id="CV8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="CV9">CV9:</label>' +
    '<input class="form-control" id="CV9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<form>' +
    '<div class="form-group">' +
    '<label for="AS1">AS1:</label>' +
    '<input class="form-control" id="AS1" placeholder="AS" disabled>' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS2">AS2:</label>' +
    '<input class="form-control" id="AS2">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS3">AS3:</label>' +
    '<input class="form-control" id="AS3">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS4">AS4:</label>' +
    '<input class="form-control" id="AS4">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS5">AS5:</label>' +
    '<input class="form-control" id="AS5">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS6">AS6:</label>' +
    '<input class="form-control" id="AS6">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS7">AS7:</label>' +
    '<input class="form-control" id="AS7">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS8">AS8:</label>' +
    '<input class="form-control" id="AS8">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="AS9">AS9:</label>' +
    '<input class="form-control" id="AS9">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-4 column" >' +
    '</div>' +
    '<div class="col-md-2 column" >' +
    '<br>' +
    '<button onclick="setupConfirm()" id="setupConfirm" type="button" class="btn btn-primary btn-sm btn-block">Confirm</button>' +
    '<br>' +
    '</div>' +
    '<div class="col-md-2 column" >' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> Cancel </button>' +
    '<br>' +
    '</div>' +
    '<div class="col-md-4 column" >' +
    '</div>' +
    '<div>' +
    '</div>';

  if (window.adminCheck != "true") {
    document.getElementById("setupConfirm").disabled = true;
  }

  // Grab existing data
  var firebaseRef = firebase.database().ref();
  firebaseRef.once('value').then(function (snapshot) {

    // AR
    var ar02 = snapshot.child(pNumber).child("dict").child("disc").child("AR02").val();
    var ar03 = snapshot.child(pNumber).child("dict").child("disc").child("AR03").val();
    var ar04 = snapshot.child(pNumber).child("dict").child("disc").child("AR04").val();
    var ar05 = snapshot.child(pNumber).child("dict").child("disc").child("AR05").val();
    var ar06 = snapshot.child(pNumber).child("dict").child("disc").child("AR06").val();
    var ar07 = snapshot.child(pNumber).child("dict").child("disc").child("AR07").val();
    var ar08 = snapshot.child(pNumber).child("dict").child("disc").child("AR08").val();
    var ar09 = snapshot.child(pNumber).child("dict").child("disc").child("AR09").val();

    // ST
    var st02 = snapshot.child(pNumber).child("dict").child("disc").child("ST02").val();
    var st03 = snapshot.child(pNumber).child("dict").child("disc").child("ST03").val();
    var st04 = snapshot.child(pNumber).child("dict").child("disc").child("ST04").val();
    var st05 = snapshot.child(pNumber).child("dict").child("disc").child("ST05").val();
    var st06 = snapshot.child(pNumber).child("dict").child("disc").child("ST06").val();
    var st07 = snapshot.child(pNumber).child("dict").child("disc").child("ST07").val();
    var st08 = snapshot.child(pNumber).child("dict").child("disc").child("ST08").val();
    var st09 = snapshot.child(pNumber).child("dict").child("disc").child("ST09").val();

    // UU
    var uu02 = snapshot.child(pNumber).child("dict").child("disc").child("UU02").val();
    var uu03 = snapshot.child(pNumber).child("dict").child("disc").child("UU03").val();
    var uu04 = snapshot.child(pNumber).child("dict").child("disc").child("UU04").val();
    var uu05 = snapshot.child(pNumber).child("dict").child("disc").child("UU05").val();
    var uu06 = snapshot.child(pNumber).child("dict").child("disc").child("UU06").val();
    var uu07 = snapshot.child(pNumber).child("dict").child("disc").child("UU07").val();
    var uu08 = snapshot.child(pNumber).child("dict").child("disc").child("UU08").val();
    var uu09 = snapshot.child(pNumber).child("dict").child("disc").child("UU09").val();

    // BS
    var bs07 = snapshot.child(pNumber).child("dict").child("disc").child("BS07").val();
    var bs08 = snapshot.child(pNumber).child("dict").child("disc").child("BS08").val();
    var bs09 = snapshot.child(pNumber).child("dict").child("disc").child("BS09").val();

    // CV
    var cv02 = snapshot.child(pNumber).child("dict").child("disc").child("CV02").val();
    var cv03 = snapshot.child(pNumber).child("dict").child("disc").child("CV03").val();
    var cv04 = snapshot.child(pNumber).child("dict").child("disc").child("CV04").val();
    var cv05 = snapshot.child(pNumber).child("dict").child("disc").child("CV05").val();
    var cv06 = snapshot.child(pNumber).child("dict").child("disc").child("CV06").val();
    var cv07 = snapshot.child(pNumber).child("dict").child("disc").child("CV07").val();
    var cv08 = snapshot.child(pNumber).child("dict").child("disc").child("CV08").val();
    var cv09 = snapshot.child(pNumber).child("dict").child("disc").child("CV09").val();

    // AS
    var as02 = snapshot.child(pNumber).child("dict").child("disc").child("AS02").val();
    var as03 = snapshot.child(pNumber).child("dict").child("disc").child("AS03").val();
    var as04 = snapshot.child(pNumber).child("dict").child("disc").child("AS04").val();
    var as05 = snapshot.child(pNumber).child("dict").child("disc").child("AS05").val();
    var as06 = snapshot.child(pNumber).child("dict").child("disc").child("AS06").val();
    var as07 = snapshot.child(pNumber).child("dict").child("disc").child("AS07").val();
    var as08 = snapshot.child(pNumber).child("dict").child("disc").child("AS08").val();
    var as09 = snapshot.child(pNumber).child("dict").child("disc").child("AS09").val();

    // UU Level status
    var UUCheck = snapshot.child(pNumber).child("dict").child("UU").val();

    // Level Name
    var levelName01 = snapshot.child(pNumber).child("dict").child("level").child("L01").child("name").val();
    var levelName02 = snapshot.child(pNumber).child("dict").child("level").child("L02").child("name").val();
    var levelName03 = snapshot.child(pNumber).child("dict").child("level").child("L03").child("name").val();
    var levelName04 = snapshot.child(pNumber).child("dict").child("level").child("L04").child("name").val();
    var levelName05 = snapshot.child(pNumber).child("dict").child("level").child("L05").child("name").val();
    var levelName06 = snapshot.child(pNumber).child("dict").child("level").child("L06").child("name").val();
    var levelName07 = snapshot.child(pNumber).child("dict").child("level").child("L07").child("name").val();
    var levelName08 = snapshot.child(pNumber).child("dict").child("level").child("L08").child("name").val();
    var levelName09 = snapshot.child(pNumber).child("dict").child("level").child("L09").child("name").val();
    var levelName10 = snapshot.child(pNumber).child("dict").child("level").child("L10").child("name").val();

    // Level Height
    var levelHeight01 = snapshot.child(pNumber).child("dict").child("level").child("L01").child("height").val();
    var levelHeight02 = snapshot.child(pNumber).child("dict").child("level").child("L02").child("height").val();
    var levelHeight03 = snapshot.child(pNumber).child("dict").child("level").child("L03").child("height").val();
    var levelHeight04 = snapshot.child(pNumber).child("dict").child("level").child("L04").child("height").val();
    var levelHeight05 = snapshot.child(pNumber).child("dict").child("level").child("L05").child("height").val();
    var levelHeight06 = snapshot.child(pNumber).child("dict").child("level").child("L06").child("height").val();
    var levelHeight07 = snapshot.child(pNumber).child("dict").child("level").child("L07").child("height").val();
    var levelHeight08 = snapshot.child(pNumber).child("dict").child("level").child("L08").child("height").val();
    var levelHeight09 = snapshot.child(pNumber).child("dict").child("level").child("L09").child("height").val();
    var levelHeight10 = snapshot.child(pNumber).child("dict").child("level").child("L10").child("height").val();
    // Fill existing data
    // Fill UU status
    document.getElementById("UUCheck").value = UUCheck;
    // Fill level name
    document.getElementById("levelName01").value = levelName01;
    document.getElementById("levelName02").value = levelName02;
    document.getElementById("levelName03").value = levelName03;
    document.getElementById("levelName04").value = levelName04;
    document.getElementById("levelName05").value = levelName05;
    document.getElementById("levelName06").value = levelName06;
    document.getElementById("levelName07").value = levelName07;
    document.getElementById("levelName08").value = levelName08;
    document.getElementById("levelName09").value = levelName09;
    document.getElementById("levelName10").value = levelName10;

    // Fill level height
    document.getElementById("levelHeight01").value = levelHeight01;
    document.getElementById("levelHeight02").value = levelHeight02;
    document.getElementById("levelHeight03").value = levelHeight03;
    document.getElementById("levelHeight04").value = levelHeight04;
    document.getElementById("levelHeight05").value = levelHeight05;
    document.getElementById("levelHeight06").value = levelHeight06;
    document.getElementById("levelHeight07").value = levelHeight07;
    document.getElementById("levelHeight08").value = levelHeight08;
    document.getElementById("levelHeight09").value = levelHeight09;
    document.getElementById("levelHeight10").value = levelHeight10;

    // Fill discipline

    // to be done
  })
}

function setupConfirm() {

  // Update Level
  // Is UU included
  var UUCheck = $('#UUCheck').prop('checked');
  var ref = firebase.database().ref(pNumber + "/dict/UU");
  ref.set(UUCheck);
  // Grab new level name
  var levelName01 = document.getElementById("levelName01").value;
  var levelName02 = document.getElementById("levelName02").value;
  var levelName03 = document.getElementById("levelName03").value;
  var levelName04 = document.getElementById("levelName04").value;
  var levelName05 = document.getElementById("levelName05").value;
  var levelName06 = document.getElementById("levelName06").value;
  var levelName07 = document.getElementById("levelName07").value;
  var levelName08 = document.getElementById("levelName08").value;
  var levelName09 = document.getElementById("levelName09").value;
  var levelName10 = document.getElementById("levelName10").value;

  // Grab new level height
  var levelHeight01 = document.getElementById("levelHeight01").value;
  var levelHeight02 = document.getElementById("levelHeight02").value;
  var levelHeight03 = document.getElementById("levelHeight03").value;
  var levelHeight04 = document.getElementById("levelHeight04").value;
  var levelHeight05 = document.getElementById("levelHeight05").value;
  var levelHeight06 = document.getElementById("levelHeight06").value;
  var levelHeight07 = document.getElementById("levelHeight07").value;
  var levelHeight08 = document.getElementById("levelHeight08").value;
  var levelHeight09 = document.getElementById("levelHeight09").value;
  var levelHeight10 = document.getElementById("levelHeight10").value;

  var lName = [levelName01, levelName02, levelName03, levelName04, levelName05, levelName06, levelName07, levelName08, levelName09, levelName10];
  var lHeight = [levelHeight01, levelHeight02, levelHeight03, levelHeight04, levelHeight05, levelHeight06, levelHeight07, levelHeight08, levelHeight09, levelHeight10];
  var levelData = "{";
  var i = 0;
  for (var x in lName) {
    if (lName[x] != null && lName[x] != "") {
      i++;
      levelData += '"L0' + i + '":{"height":"' + lHeight[x] + '","name":"' + lName[x] + '"},'
    }
  }
  var levelStr = levelData.substring(0, levelData.length - 1);
  levelStr += '}';
  var levelJSON = JSON.parse(levelStr);

  // Push Level Data
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(pNumber).child("dict").child("level").set(levelJSON);
  alert("Setup Successfully!");
  toSummary();
}

function newReport() {
  // Jump Div
  document.getElementById("login").style.display = "none";
  document.getElementById("pSummary").style.display = "none";
  document.getElementById("setup").style.display = "none";
  document.getElementById("newReport").style.display = "block";

  document.getElementById("pSummary").innerHTML = null;
  document.getElementById("setup").innerHTML = null;

  document.getElementById("newReport").innerHTML =
    '<div class="container">' +
    '<div id="converter" class="text-center">' +
    '<h5>Please select the .csv file: </h5>' +
    '<br>' +
    '<input type="file" id="files" multiple>' +
    '<br><br><br><br>' +
    '</div>' +
    '<br>' +
    '</div>' +
    '<div class="container">' +
    '<div class="row clearfix">' +
    '<div class="col-md-4 column">' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="submitParse()"  type="button"' +
    'class="btn btn-primary btn-sm btn-block">Submit</button>' +
    '</div>' +
    '<div class="col-md-2 column">' +
    '<br>' +
    '<button onclick="toSummary()" type="submit" class="btn btn-outline-info btn-sm btn-block"> Cancel </button>' +
    '<br>' +
    '</div>' +
    '<div class="col-md-4 column">' +
    '</div>' +
    '</div>' +
    '</div>'
}

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

// CSV to JSON by Papa Parse
function submitParse() {
  var file = $('#files')[0].files;

  // If there is a local file selected
  if (file.length > 0) {
    $('#files').parse({
      config: {
        delimiter: "",
        newline: "",
        header: true,
        dynamicTyping: false,
        preview: 0,
        step: undefined,
        encoding: "",
        worker: false,
        comments: false,
        download: false,
        fastMode: undefined,
        skipEmptyLines: false,
        chunk: undefined,
        beforeFirstChunk: undefined,
        complete: function (results, file) {
          console.log("Parsing complete: ", results, file);
          updateReport(results)
        }
      },
      before: function (file, inputElem) {
        // executed before parsing each file begins;
        // what you return here controls the flow
      },
      complete: function () {
        // executed after all files are complete
        alert("The report has been submitted to the system successfully!");
        byDisc();
      }
    });
  }
  // If there is no local file selected, try textarea contents
  else {
    alert("Please select a .csv file!");
  }
}

function updateReport(results) {
  // Get report date
  let date = new Date();
  var reportDate = dateFormat("YYYY-mm-dd", date);
  jumpDate = reportDate;

  // Parse results
  var rArray = results.data;

  // Define clash items
  // Main clash total
  var AR01AR01All = 0;
  var AR01ST01All = 0;
  var AR01UU01All = 0;
  var AR01BS01All = 0;
  var AR01CV01All = 0;
  var AR01AS01All = 0;
  var ST01ST01All = 0;
  var ST01UU01All = 0;
  var ST01BS01All = 0;
  var ST01CV01All = 0;
  var ST01AS01All = 0;
  var UU01UU01All = 0;
  var UU01BS01All = 0;
  var UU01CV01All = 0;
  var UU01AS01All = 0;
  var BS01BS01All = 0;
  var BS01CV01All = 0;
  var BS01AS01All = 0;
  var CV01CV01All = 0;
  var CV01AS01All = 0;
  var AS01AS01All = 0;

  // Main clash hard
  var AR01AR01Hard = 0;
  var AR01ST01Hard = 0;
  var AR01UU01Hard = 0;
  var AR01BS01Hard = 0;
  var AR01CV01Hard = 0;
  var AR01AS01Hard = 0;
  var ST01ST01Hard = 0;
  var ST01UU01Hard = 0;
  var ST01BS01Hard = 0;
  var ST01CV01Hard = 0;
  var ST01AS01Hard = 0;
  var UU01UU01Hard = 0;
  var UU01BS01Hard = 0;
  var UU01CV01Hard = 0;
  var UU01AS01Hard = 0;
  var BS01BS01Hard = 0;
  var BS01CV01Hard = 0;
  var BS01AS01Hard = 0;
  var CV01CV01Hard = 0;
  var CV01AS01Hard = 0;
  var AS01AS01Hard = 0;

  // BS clash total
  var BS02BS02All = 0;
  var BS02BS03All = 0;
  var BS02BS04All = 0;
  var BS02BS05All = 0;
  var BS02BS06All = 0;
  var BS03BS03All = 0;
  var BS03BS04All = 0;
  var BS03BS05All = 0;
  var BS03BS06All = 0;
  var BS04BS04All = 0;
  var BS04BS05All = 0;
  var BS04BS06All = 0;
  var BS05BS05All = 0;
  var BS05BS06All = 0;
  var BS06BS06All = 0;

  // BS clash hard
  var BS02BS02Hard = 0;
  var BS02BS03Hard = 0;
  var BS02BS04Hard = 0;
  var BS02BS05Hard = 0;
  var BS02BS06Hard = 0;
  var BS03BS03Hard = 0;
  var BS03BS04Hard = 0;
  var BS03BS05Hard = 0;
  var BS03BS06Hard = 0;
  var BS04BS04Hard = 0;
  var BS04BS05Hard = 0;
  var BS04BS06Hard = 0;
  var BS05BS05Hard = 0;
  var BS05BS06Hard = 0;
  var BS06BS06Hard = 0;

  var firebaseRef = firebase.database().ref();
  firebaseRef.child(pNumber).once('value').then(function (snapshot) {
    // UU variables
    var UUCheck = snapshot.child("dict").child("UU").val();
    var UUAll = 0;
    var UUHard = 0;

    // Setup Level Dataset
    var levelList = snapshot.child("dict").child("level").val();
    var levelHeightList = [];
    var levelCount = 0;
    var levelSet = "{";
    var levelDetailSet = "{";
    var levelBSDetailSet = "{";
    for (var x in levelList) {
      var levelHeight = snapshot.child("dict").child("level").child(x).child("height").val();
      if (levelHeight != "" && levelHeight != null) {
        levelHeightList.push(levelHeight);
        levelCount++;
        levelSet += '"L0' + levelCount + '": 0,'
        levelDetailSet += '"L0' + levelCount + '": {"AR01AR01" : 0,"AR01AS01" : 0,"AR01BS01" : 0,"AR01CV01" : 0,"AR01ST01" : 0,"AR01UU01" : 0,"AS01AS01" : 0,"BS01AS01" : 0,"BS01BS01" : 0,"BS01CV01" : 0,"CV01AS01" : 0,"CV01CV01" : 0,"ST01AS01" : 0,"ST01BS01" : 0,"ST01CV01" : 0,"ST01ST01" : 0,"ST01UU01" : 0,"UU01AS01" : 0,"UU01BS01" : 0,"UU01CV01" : 0,"UU01UU01" : 0},';
        levelBSDetailSet += '"L0' + levelCount + '": {"BS02BS02" : 0,"BS02BS03" : 0,"BS02BS04" : 0,"BS02BS05" : 0,"BS02BS06" : 0,"BS03BS03" : 0,"BS03BS04" : 0,"BS03BS05" : 0,"BS03BS06" : 0,"BS04BS04" : 0,"BS04BS05" : 0,"BS04BS06" : 0,"BS05BS05" : 0,"BS05BS06" : 0,"BS06BS06" : 0},';
      }
    }
    var levelStr = levelSet.substring(0, levelSet.length - 1);
    var levelDetailStr = levelDetailSet.substring(0, levelDetailSet.length - 1);
    var levelBSDetailStr = levelBSDetailSet.substring(0, levelBSDetailSet.length - 1);
    levelStr += '}';
    levelDetailStr += '}';
    levelBSDetailStr += '}';

    var levelHardClash = JSON.parse(levelStr);
    var levelAllClash = JSON.parse(levelStr);

    var levelDetailHard = JSON.parse(levelDetailStr);
    var levelDetailAll = JSON.parse(levelDetailStr);

    var levelBSDetailHard = JSON.parse(levelBSDetailStr);
    var levelBSDetailAll = JSON.parse(levelBSDetailStr);

    var topLevelIndex = parseInt(levelHeightList.length) - 1;

    // Loop report JSON for clash counting
    for (var i = 0; i < rArray.length; i++) {
      var reportName = rArray[i].ReportName;
      var reportStatus = rArray[i].Status;
      var clashPtZ = rArray[i].ClashPtZ;
      // Eliminate digital clash and false clash
      if (reportStatus != "Resolved" && reportStatus != "Approved") {

        // Main number
        if (/AR01AR01/.test(reportName)) {
          AR01AR01All++;
          if (reportStatus != "Reviewed") {
            AR01AR01Hard++;
          }
        } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
          AR01ST01All++;
          if (reportStatus != "Reviewed") {
            AR01ST01Hard++;
          }
        } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
          AR01UU01All++;
          if (reportStatus != "Reviewed") {
            AR01UU01Hard++;
          }
        } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
          AR01BS01All++;
          if (reportStatus != "Reviewed") {
            AR01BS01Hard++;
          }
        } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
          AR01CV01All++;
          if (reportStatus != "Reviewed") {
            AR01CV01Hard++;
          }
        } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
          AR01AS01All++;
          if (reportStatus != "Reviewed") {
            AR01AS01Hard++;
          }
        } else if (/ST01ST01/.test(reportName)) {
          ST01ST01All++;
          if (reportStatus != "Reviewed") {
            ST01ST01Hard++;
          }
        } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
          ST01UU01All++;
          if (reportStatus != "Reviewed") {
            ST01UU01Hard++;
          }
        } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
          ST01BS01All++;
          if (reportStatus != "Reviewed") {
            ST01BS01Hard++;
          }
        } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
          ST01CV01All++;
          if (reportStatus != "Reviewed") {
            ST01CV01Hard++;
          }
        } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
          ST01AS01All++;
          if (reportStatus != "Reviewed") {
            ST01AS01Hard++;
          }
        } else if (/UU01UU01/.test(reportName)) {
          UU01UU01All++;
          if (reportStatus != "Reviewed") {
            UU01UU01Hard++;
          }
        } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
          UU01BS01All++;
          if (reportStatus != "Reviewed") {
            UU01BS01Hard++;
          }
        } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
          UU01CV01All++;
          if (reportStatus != "Reviewed") {
            UU01CV01Hard++;
          }
        } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
          UU01AS01All++;
          if (reportStatus != "Reviewed") {
            UU01AS01Hard++;
          }
        } else if (/BS01BS01/.test(reportName)) {
          BS01BS01All++;
          if (reportStatus != "Reviewed") {
            BS01BS01Hard++;
          }
        } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
          BS01CV01All++;
          if (reportStatus != "Reviewed") {
            BS01CV01Hard++;
          }
        } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
          BS01AS01All++;
          if (reportStatus != "Reviewed") {
            BS01AS01Hard++;
          }
        } else if (/CV01CV01/.test(reportName)) {
          CV01CV01All++;
          if (reportStatus != "Reviewed") {
            CV01CV01Hard++;
          }
        } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
          CV01AS01All++;
          if (reportStatus != "Reviewed") {
            CV01AS01Hard++;
          }
        } else if (/AS01AS01/.test(reportName)) {
          AS01AS01All++;
          if (reportStatus != "Reviewed") {
            AS01AS01Hard++;
          }
          // BS Number
        } else if (/BS02BS02/.test(reportName)) {
          BS02BS02All++;
          if (reportStatus != "Reviewed") {
            BS02BS02Hard++;
          }
        } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
          BS02BS03All++;
          if (reportStatus != "Reviewed") {
            BS02BS03Hard++;
          }
        } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
          BS02BS04All++;
          if (reportStatus != "Reviewed") {
            BS02BS04Hard++;
          }
        } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
          BS02BS05All++;
          if (reportStatus != "Reviewed") {
            BS02BS05Hard++;
          }
        } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
          BS02BS06All++;
          if (reportStatus != "Reviewed") {
            BS02BS06Hard++;
          }
        } else if (/BS03BS03/.test(reportName)) {
          BS03BS03All++;
          if (reportStatus != "Reviewed") {
            BS03BS03Hard++;
          }
        } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
          BS03BS04All++;
          if (reportStatus != "Reviewed") {
            BS03BS04Hard++;
          }
        } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
          BS03BS05All++;
          if (reportStatus != "Reviewed") {
            BS03BS05Hard++;
          }
        } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
          BS03BS06All++;
          if (reportStatus != "Reviewed") {
            BS03BS06Hard++;
          }
        } else if (/BS04BS04/.test(reportName)) {
          BS04BS04All++;
          if (reportStatus != "Reviewed") {
            BS04BS04Hard++;
          }
        } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
          BS04BS05All++;
          if (reportStatus != "Reviewed") {
            BS04BS05Hard++;
          }
        } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
          BS04BS06All++;
          if (reportStatus != "Reviewed") {
            BS04BS06Hard++;
          }
        } else if (/BS05BS05/.test(reportName)) {
          BS05BS05All++;
          if (reportStatus != "Reviewed") {
            BS05BS05Hard++;
          }
        } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
          BS05BS06All++;
          if (reportStatus != "Reviewed") {
            BS05BS06Hard++;
          }
        } else if (/BS06BS06/.test(reportName)) {
          BS06BS06All++;
          if (reportStatus != "Reviewed") {
            BS06BS06Hard++;
          }
        }

        // Sort clash report by level
        // Only count all "01" tests
        if (/AR01AR01/.test(reportName) || /AR01ST01/.test(reportName) || /ST01AR01/.test(reportName) || /AR01UU01/.test(reportName) || /UU01AR01/.test(reportName) || /AR01BS01/.test(reportName) || /BS01AR01/.test(reportName) || /AR01CV01/.test(reportName) || /CV01AR01/.test(reportName) || /AR01AS01/.test(reportName) || /AS01AR01/.test(reportName) || /ST01ST01/.test(reportName) || /ST01UU01/.test(reportName) || /UU01ST01/.test(reportName) || /ST01BS01/.test(reportName) || /BS01ST01/.test(reportName) || /ST01CV01/.test(reportName) || /CV01ST01/.test(reportName) || /ST01AS01/.test(reportName) || /AS01ST01/.test(reportName) || /UU01UU01/.test(reportName) || /UU01BS01/.test(reportName) || /BS01UU01/.test(reportName) || /UU01CV01/.test(reportName) || /CV01UU01/.test(reportName) || /UU01AS01/.test(reportName) || /AS01UU01/.test(reportName) || /BS01BS01/.test(reportName) || /BS01CV01/.test(reportName) || /CV01BS01/.test(reportName) || /BS01AS01/.test(reportName) || /AS01BS01/.test(reportName) || /CV01CV01/.test(reportName) || /CV01AS01/.test(reportName) || /AS01CV01/.test(reportName) || /AS01AS01/.test(reportName)) {
          // Array前面有个UU的数据会错开，单独赋值
          var m = 0;
          if (UUCheck) {
            if (parseInt(clashPtZ) < parseInt(levelHeightList[0])) {
              UUAll++
              if (reportStatus != "Reviewed") {
                UUHard++;
              }
            } else {
              for (var y in levelHeightList) {
                m++;
                if (parseInt(levelHeightList[y]) <= parseInt(clashPtZ) && parseInt(clashPtZ) < parseInt(levelHeightList[m])) {
                  if (y == 0) {
                    levelAllClash.L01++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L01.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L01.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L01.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L01.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L01.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L01.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L01++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L01.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L01.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L01.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L01.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L01.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L01.BS06BS06++;
                      }
                    }
                  } else if (y == 1) {
                    levelAllClash.L02++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L02.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L02.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L02.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L02.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L02.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L02.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L02++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L02.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L02.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L02.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L02.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L02.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L02.BS06BS06++;
                      }
                    }
                  } else if (y == 2) {
                    levelAllClash.L03++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L03.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L03.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L03.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L03.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L03.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L03.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L03++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L03.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L03.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L03.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L03.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L03.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L03.BS06BS06++;
                      }
                    }
                  } else if (y == 3) {
                    levelAllClash.L04++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L04.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L04.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L04.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L04.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L04.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L04.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L04++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L04.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L04.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L04.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L04.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L04.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L04.BS06BS06++;
                      }
                    }
                  } else if (y == 4) {
                    levelAllClash.L05++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L05.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L05.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L05.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L05.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L05.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L05.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L05++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L05.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L05.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L05.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L05.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L05.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L05.BS06BS06++;
                      }
                    }
                  } else if (y == 5) {
                    levelAllClash.L06++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L06.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L06.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L06.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L06.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L06.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L06.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L06++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L06.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L06.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L06.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L06.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L06.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L06.BS06BS06++;
                      }
                    }
                  } else if (y == 6) {
                    levelAllClash.L07++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L07.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L07.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L07.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L07.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L07.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L07.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L07++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L07.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L07.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L07.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L07.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L07.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L07.BS06BS06++;
                      }
                    }
                  } else if (y == 7) {
                    levelAllClash.L08++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L08.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L08.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L08.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L08.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L08.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L08.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L08++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L08.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L08.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L08.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L08.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L08.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L08.BS06BS06++;
                      }
                    }
                  } else if (y == 8) {
                    levelAllClash.L09++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L09.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L09.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L09.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L09.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L09.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L09.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L09++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L09.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L09.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L09.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L09.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L09.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L09.BS06BS06++;
                      }
                    }
                  } else if (y == 9) {
                    levelAllClash.L10++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L10.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L10.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L10.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L10.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L10.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L10.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L10++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L10.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L10.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L10.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L10.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L10.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L10.BS06BS06++;
                      }
                    }
                  }
                } else if (parseInt(levelHeightList[parseInt(topLevelIndex)]) <= parseInt(clashPtZ)) {
                  // Top level clash count
                  if (topLevelIndex == 0) {
                    levelAllClash.L01++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L01.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L01.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L01.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L01.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L01.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L01.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L01.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L01.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L01.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L01.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L01.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L01.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L01.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L01++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L01.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L01.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L01.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L01.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L01.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L01.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L01.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L01.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L01.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L01.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L01.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L01.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L01.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 1) {
                    levelAllClash.L02++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L02.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L02.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L02.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L02.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L02.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L02.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L02.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L02.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L02.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L02.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L02.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L02.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L02.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L02++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L02.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L02.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L02.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L02.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L02.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L02.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L02.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L02.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L02.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L02.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L02.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L02.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L02.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 2) {
                    levelAllClash.L03++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L03.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L03.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L03.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L03.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L03.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L03.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L03.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L03.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L03.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L03.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L03.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L03.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L03.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L03++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L03.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L03.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L03.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L03.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L03.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L03.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L03.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L03.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L03.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L03.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L03.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L03.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L03.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 3) {
                    levelAllClash.L04++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L04.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L04.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L04.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L04.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L04.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L04.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L04.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L04.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L04.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L04.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L04.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L04.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L04.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L04++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L04.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L04.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L04.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L04.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L04.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L04.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L04.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L04.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L04.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L04.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L04.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L04.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L04.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 4) {
                    levelAllClash.L05++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L05.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L05.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L05.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L05.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L05.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L05.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L05.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L05.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L05.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L05.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L05.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L05.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L05.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L05++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L05.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L05.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L05.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L05.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L05.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L05.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L05.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L05.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L05.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L05.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L05.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L05.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L05.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 5) {
                    levelAllClash.L06++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L06.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L06.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L06.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L06.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L06.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L06.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L06.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L06.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L06.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L06.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L06.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L06.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L06.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L06++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L06.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L06.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L06.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L06.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L06.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L06.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L06.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L06.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L06.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L06.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L06.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L06.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L06.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 6) {
                    levelAllClash.L07++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L07.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L07.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L07.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L07.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L07.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L07.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L07.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L07.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L07.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L07.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L07.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L07.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L07.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L07++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L07.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L07.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L07.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L07.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L07.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L07.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L07.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L07.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L07.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L07.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L07.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L07.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L07.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 7) {
                    levelAllClash.L08++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L08.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L08.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L08.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L08.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L08.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L08.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L08.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L08.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L08.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L08.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L08.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L08.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L08.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L08++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L08.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L08.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L08.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L08.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L08.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L08.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L08.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L08.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L08.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L08.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L08.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L08.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L08.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 8) {
                    levelAllClash.L09++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L09.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L09.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L09.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L09.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L09.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L09.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L09.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L09.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L09.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L09.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L09.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L09.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L09.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L09++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L09.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L09.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L09.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L09.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L09.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L09.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L09.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L09.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L09.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L09.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L09.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L09.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L09.BS06BS06++;
                      }
                    }
                  } else if (topLevelIndex == 9) {
                    levelAllClash.L10++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailAll.L10.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailAll.L10.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailAll.L10.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailAll.L10.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailAll.L10.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailAll.L10.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailAll.L10.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailAll.L10.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailAll.L10.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailAll.L10.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailAll.L10.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailAll.L10.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailAll.L10.BS06BS06++;
                    }
                    if (reportStatus != "Reviewed") {
                      levelHardClash.L10++;
                      if (/AR01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01AR01++;
                      } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01ST01++;
                      } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01UU01++;
                      } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01BS01++;
                      } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01CV01++;
                      } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                        levelDetailHard.L10.AR01AS01++;
                      } else if (/ST01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01ST01++;
                      } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01UU01++;
                      } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01BS01++;
                      } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01CV01++;
                      } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                        levelDetailHard.L10.ST01AS01++;
                      } else if (/UU01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01UU01++;
                      } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01BS01++;
                      } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01CV01++;
                      } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                        levelDetailHard.L10.UU01AS01++;
                      } else if (/BS01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01BS01++;
                      } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01CV01++;
                      } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                        levelDetailHard.L10.BS01AS01++;
                      } else if (/CV01CV01/.test(reportName)) {
                        levelDetailHard.L10.CV01CV01++;
                      } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                        levelDetailHard.L10.CV01AS01++;
                      } else if (/AS01AS01/.test(reportName)) {
                        levelDetailHard.L10.AS01AS01++;
                        // BS Number
                      } else if (/BS02BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS02++;
                      } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS03++;
                      } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS04++;
                      } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS05++;
                      } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                        levelBSDetailHard.L10.BS02BS06++;
                      } else if (/BS03BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS03++;
                      } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS04++;
                      } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS05++;
                      } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                        levelBSDetailHard.L10.BS03BS06++;
                      } else if (/BS04BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS04++;
                      } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS05++;
                      } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                        levelBSDetailHard.L10.BS04BS06++;
                      } else if (/BS05BS05/.test(reportName)) {
                        levelBSDetailHard.L10.BS05BS05++;
                      } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                        levelBSDetailHard.L10.BS05BS06++;
                      } else if (/BS06BS06/.test(reportName)) {
                        levelBSDetailHard.L10.BS06BS06++;
                      }
                    }
                  }
                }
              }
            }
          } else {
            for (var y in levelHeightList) {
              m++;
              if (parseInt(levelHeightList[y]) <= parseInt(clashPtZ) && parseInt(clashPtZ) < parseInt(levelHeightList[m])) {
                if (y == 0) {
                  levelAllClash.L01++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L01.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L01.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L01.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L01.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L01.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L01.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L01++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L01.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L01.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L01.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L01.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L01.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L01.BS06BS06++;
                    }
                  }
                } else if (y == 1) {
                  levelAllClash.L02++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L02.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L02.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L02.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L02.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L02.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L02.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L02++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L02.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L02.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L02.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L02.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L02.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L02.BS06BS06++;
                    }
                  }
                } else if (y == 2) {
                  levelAllClash.L03++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L03.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L03.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L03.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L03.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L03.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L03.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L03++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L03.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L03.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L03.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L03.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L03.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L03.BS06BS06++;
                    }
                  }
                } else if (y == 3) {
                  levelAllClash.L04++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L04.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L04.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L04.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L04.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L04.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L04.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L04++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L04.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L04.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L04.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L04.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L04.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L04.BS06BS06++;
                    }
                  }
                } else if (y == 4) {
                  levelAllClash.L05++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L05.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L05.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L05.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L05.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L05.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L05.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L05++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L05.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L05.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L05.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L05.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L05.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L05.BS06BS06++;
                    }
                  }
                } else if (y == 5) {
                  levelAllClash.L06++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L06.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L06.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L06.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L06.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L06.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L06.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L06++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L06.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L06.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L06.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L06.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L06.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L06.BS06BS06++;
                    }
                  }
                } else if (y == 6) {
                  levelAllClash.L07++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L07.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L07.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L07.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L07.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L07.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L07.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L07++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L07.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L07.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L07.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L07.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L07.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L07.BS06BS06++;
                    }
                  }
                } else if (y == 7) {
                  levelAllClash.L08++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L08.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L08.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L08.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L08.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L08.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L08.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L08++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L08.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L08.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L08.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L08.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L08.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L08.BS06BS06++;
                    }
                  }
                } else if (y == 8) {
                  levelAllClash.L09++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L09.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L09.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L09.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L09.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L09.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L09.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L09++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L09.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L09.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L09.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L09.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L09.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L09.BS06BS06++;
                    }
                  }
                } else if (y == 9) {
                  levelAllClash.L10++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L10.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L10.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L10.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L10.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L10.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L10.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L10++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L10.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L10.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L10.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L10.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L10.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L10.BS06BS06++;
                    }
                  }
                }
              } else if (parseInt(levelHeightList[parseInt(topLevelIndex)]) <= parseInt(clashPtZ)) {
                // Top level clash count
                if (topLevelIndex == 0) {
                  levelAllClash.L01++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L01.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L01.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L01.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L01.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L01.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L01.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L01.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L01.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L01.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L01.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L01.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L01.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L01.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L01++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L01.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L01.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L01.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L01.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L01.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L01.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L01.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L01.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L01.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L01.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L01.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L01.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L01.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 1) {
                  levelAllClash.L02++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L02.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L02.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L02.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L02.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L02.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L02.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L02.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L02.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L02.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L02.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L02.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L02.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L02.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L02++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L02.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L02.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L02.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L02.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L02.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L02.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L02.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L02.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L02.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L02.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L02.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L02.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L02.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 2) {
                  levelAllClash.L03++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L03.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L03.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L03.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L03.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L03.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L03.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L03.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L03.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L03.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L03.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L03.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L03.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L03.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L03++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L03.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L03.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L03.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L03.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L03.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L03.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L03.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L03.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L03.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L03.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L03.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L03.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L03.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 3) {
                  levelAllClash.L04++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L04.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L04.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L04.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L04.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L04.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L04.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L04.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L04.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L04.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L04.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L04.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L04.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L04.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L04++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L04.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L04.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L04.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L04.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L04.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L04.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L04.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L04.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L04.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L04.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L04.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L04.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L04.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 4) {
                  levelAllClash.L05++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L05.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L05.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L05.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L05.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L05.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L05.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L05.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L05.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L05.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L05.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L05.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L05.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L05.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L05++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L05.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L05.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L05.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L05.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L05.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L05.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L05.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L05.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L05.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L05.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L05.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L05.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L05.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 5) {
                  levelAllClash.L06++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L06.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L06.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L06.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L06.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L06.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L06.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L06.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L06.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L06.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L06.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L06.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L06.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L06.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L06++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L06.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L06.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L06.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L06.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L06.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L06.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L06.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L06.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L06.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L06.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L06.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L06.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L06.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 6) {
                  levelAllClash.L07++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L07.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L07.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L07.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L07.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L07.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L07.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L07.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L07.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L07.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L07.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L07.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L07.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L07.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L07++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L07.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L07.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L07.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L07.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L07.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L07.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L07.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L07.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L07.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L07.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L07.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L07.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L07.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 7) {
                  levelAllClash.L08++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L08.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L08.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L08.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L08.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L08.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L08.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L08.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L08.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L08.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L08.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L08.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L08.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L08.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L08++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L08.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L08.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L08.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L08.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L08.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L08.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L08.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L08.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L08.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L08.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L08.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L08.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L08.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 8) {
                  levelAllClash.L09++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L09.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L09.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L09.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L09.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L09.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L09.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L09.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L09.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L09.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L09.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L09.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L09.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L09.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L09++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L09.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L09.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L09.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L09.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L09.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L09.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L09.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L09.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L09.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L09.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L09.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L09.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L09.BS06BS06++;
                    }
                  }
                } else if (topLevelIndex == 9) {
                  levelAllClash.L10++;
                  if (/AR01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01AR01++;
                  } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01ST01++;
                  } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01UU01++;
                  } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01BS01++;
                  } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01CV01++;
                  } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                    levelDetailAll.L10.AR01AS01++;
                  } else if (/ST01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01ST01++;
                  } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01UU01++;
                  } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01BS01++;
                  } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01CV01++;
                  } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                    levelDetailAll.L10.ST01AS01++;
                  } else if (/UU01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01UU01++;
                  } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01BS01++;
                  } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01CV01++;
                  } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                    levelDetailAll.L10.UU01AS01++;
                  } else if (/BS01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01BS01++;
                  } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01CV01++;
                  } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                    levelDetailAll.L10.BS01AS01++;
                  } else if (/CV01CV01/.test(reportName)) {
                    levelDetailAll.L10.CV01CV01++;
                  } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                    levelDetailAll.L10.CV01AS01++;
                  } else if (/AS01AS01/.test(reportName)) {
                    levelDetailAll.L10.AS01AS01++;
                    // BS Number
                  } else if (/BS02BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS02++;
                  } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS03++;
                  } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS04++;
                  } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS05++;
                  } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                    levelBSDetailAll.L10.BS02BS06++;
                  } else if (/BS03BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS03++;
                  } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS04++;
                  } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS05++;
                  } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                    levelBSDetailAll.L10.BS03BS06++;
                  } else if (/BS04BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS04++;
                  } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS05++;
                  } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                    levelBSDetailAll.L10.BS04BS06++;
                  } else if (/BS05BS05/.test(reportName)) {
                    levelBSDetailAll.L10.BS05BS05++;
                  } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                    levelBSDetailAll.L10.BS05BS06++;
                  } else if (/BS06BS06/.test(reportName)) {
                    levelBSDetailAll.L10.BS06BS06++;
                  }
                  if (reportStatus != "Reviewed") {
                    levelHardClash.L10++;
                    if (/AR01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01AR01++;
                    } else if (/AR01ST01/.test(reportName) || /ST01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01ST01++;
                    } else if (/AR01UU01/.test(reportName) || /UU01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01UU01++;
                    } else if (/AR01BS01/.test(reportName) || /BS01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01BS01++;
                    } else if (/AR01CV01/.test(reportName) || /CV01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01CV01++;
                    } else if (/AR01AS01/.test(reportName) || /AS01AR01/.test(reportName)) {
                      levelDetailHard.L10.AR01AS01++;
                    } else if (/ST01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01ST01++;
                    } else if (/ST01UU01/.test(reportName) || /UU01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01UU01++;
                    } else if (/ST01BS01/.test(reportName) || /BS01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01BS01++;
                    } else if (/ST01CV01/.test(reportName) || /CV01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01CV01++;
                    } else if (/ST01AS01/.test(reportName) || /AS01ST01/.test(reportName)) {
                      levelDetailHard.L10.ST01AS01++;
                    } else if (/UU01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01UU01++;
                    } else if (/UU01BS01/.test(reportName) || /BS01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01BS01++;
                    } else if (/UU01CV01/.test(reportName) || /CV01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01CV01++;
                    } else if (/UU01AS01/.test(reportName) || /AS01UU01/.test(reportName)) {
                      levelDetailHard.L10.UU01AS01++;
                    } else if (/BS01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01BS01++;
                    } else if (/BS01CV01/.test(reportName) || /CV01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01CV01++;
                    } else if (/BS01AS01/.test(reportName) || /AS01BS01/.test(reportName)) {
                      levelDetailHard.L10.BS01AS01++;
                    } else if (/CV01CV01/.test(reportName)) {
                      levelDetailHard.L10.CV01CV01++;
                    } else if (/CV01AS01/.test(reportName) || /AS01CV01/.test(reportName)) {
                      levelDetailHard.L10.CV01AS01++;
                    } else if (/AS01AS01/.test(reportName)) {
                      levelDetailHard.L10.AS01AS01++;
                      // BS Number
                    } else if (/BS02BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS02++;
                    } else if (/BS02BS03/.test(reportName) || /BS03BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS03++;
                    } else if (/BS02BS04/.test(reportName) || /BS04BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS04++;
                    } else if (/BS02BS05/.test(reportName) || /BS05BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS05++;
                    } else if (/BS02BS06/.test(reportName) || /BS06BS02/.test(reportName)) {
                      levelBSDetailHard.L10.BS02BS06++;
                    } else if (/BS03BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS03++;
                    } else if (/BS03BS04/.test(reportName) || /BS04BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS04++;
                    } else if (/BS03BS05/.test(reportName) || /BS05BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS05++;
                    } else if (/BS03BS06/.test(reportName) || /BS06BS03/.test(reportName)) {
                      levelBSDetailHard.L10.BS03BS06++;
                    } else if (/BS04BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS04++;
                    } else if (/BS04BS05/.test(reportName) || /BS05BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS05++;
                    } else if (/BS04BS06/.test(reportName) || /BS06BS04/.test(reportName)) {
                      levelBSDetailHard.L10.BS04BS06++;
                    } else if (/BS05BS05/.test(reportName)) {
                      levelBSDetailHard.L10.BS05BS05++;
                    } else if (/BS05BS06/.test(reportName) || /BS06BS05/.test(reportName)) {
                      levelBSDetailHard.L10.BS05BS06++;
                    } else if (/BS06BS06/.test(reportName)) {
                      levelBSDetailHard.L10.BS06BS06++;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    // Discipline Clash Count 
    var allCount = AR01AR01All + AR01ST01All + AR01UU01All + AR01BS01All + AR01CV01All + AR01AS01All + ST01ST01All + ST01UU01All + ST01BS01All + ST01CV01All + ST01AS01All + UU01UU01All + UU01BS01All + UU01CV01All + UU01AS01All + BS01BS01All + BS01CV01All + BS01AS01All + CV01CV01All + CV01AS01All + AS01AS01All;
    var hardCount = AR01AR01Hard + AR01ST01Hard + AR01UU01Hard + AR01BS01Hard + AR01CV01Hard + AR01AS01Hard + ST01ST01Hard + ST01UU01Hard + ST01BS01Hard + ST01CV01Hard + ST01AS01Hard + UU01UU01Hard + UU01BS01Hard + UU01CV01Hard + UU01AS01Hard + BS01BS01Hard + BS01CV01Hard + BS01AS01Hard + CV01CV01Hard + CV01AS01Hard + AS01AS01Hard;
    // 写入database
    var dataSheet = {
      "updateUser": uEmail,
      "UU": {
        "all": UUAll,
        "hard": UUHard
      },
      "all": {
        "AR01AR01": AR01AR01All,
        "AR01AS01": AR01AS01All,
        "AR01BS01": AR01BS01All,
        "AR01CV01": AR01CV01All,
        "AR01ST01": AR01ST01All,
        "AR01UU01": AR01UU01All,
        "AS01AS01": AS01AS01All,
        "BS01AS01": BS01AS01All,
        "BS01BS01": BS01BS01All,
        "BS01CV01": BS01CV01All,
        "CV01AS01": CV01AS01All,
        "CV01CV01": CV01CV01All,
        "ST01AS01": ST01AS01All,
        "ST01BS01": ST01BS01All,
        "ST01CV01": ST01CV01All,
        "ST01ST01": ST01ST01All,
        "ST01UU01": ST01UU01All,
        "UU01AS01": UU01AS01All,
        "UU01BS01": UU01BS01All,
        "UU01CV01": UU01CV01All,
        "UU01UU01": UU01UU01All,
        "total": allCount
      },
      "allBS": {
        "BS02BS02": BS02BS02All,
        "BS02BS03": BS02BS03All,
        "BS02BS04": BS02BS04All,
        "BS02BS05": BS02BS05All,
        "BS02BS06": BS02BS06All,
        "BS03BS03": BS03BS03All,
        "BS03BS04": BS03BS04All,
        "BS03BS05": BS03BS05All,
        "BS03BS06": BS03BS06All,
        "BS04BS04": BS04BS04All,
        "BS04BS05": BS04BS05All,
        "BS04BS06": BS04BS06All,
        "BS05BS05": BS05BS05All,
        "BS05BS06": BS05BS06All,
        "BS06BS06": BS06BS06All
      },
      "allLevel": levelAllClash,
      "allLevelDetail": levelDetailAll,
      "allLevelBSDetail": levelBSDetailAll,
      "hard": {
        "AR01AR01": AR01AR01Hard,
        "AR01AS01": AR01AS01Hard,
        "AR01BS01": AR01BS01Hard,
        "AR01CV01": AR01CV01Hard,
        "AR01ST01": AR01ST01Hard,
        "AR01UU01": AR01UU01Hard,
        "AS01AS01": AS01AS01Hard,
        "BS01AS01": BS01AS01Hard,
        "BS01BS01": BS01BS01Hard,
        "BS01CV01": BS01CV01Hard,
        "CV01AS01": CV01AS01Hard,
        "CV01CV01": CV01CV01Hard,
        "ST01AS01": ST01AS01Hard,
        "ST01BS01": ST01BS01Hard,
        "ST01CV01": ST01CV01Hard,
        "ST01ST01": ST01ST01Hard,
        "ST01UU01": ST01UU01Hard,
        "UU01AS01": UU01AS01Hard,
        "UU01BS01": UU01BS01Hard,
        "UU01CV01": UU01CV01Hard,
        "UU01UU01": UU01UU01Hard,
        "total": hardCount
      },
      "hardBS": {
        "BS02BS02": BS02BS02Hard,
        "BS02BS03": BS02BS03Hard,
        "BS02BS04": BS02BS04Hard,
        "BS02BS05": BS02BS05Hard,
        "BS02BS06": BS02BS06Hard,
        "BS03BS03": BS03BS03Hard,
        "BS03BS04": BS03BS04Hard,
        "BS03BS05": BS03BS05Hard,
        "BS03BS06": BS03BS06Hard,
        "BS04BS04": BS04BS04Hard,
        "BS04BS05": BS04BS05Hard,
        "BS04BS06": BS04BS06Hard,
        "BS05BS05": BS05BS05Hard,
        "BS05BS06": BS05BS06Hard,
        "BS06BS06": BS06BS06Hard
      },
      "hardLevel": levelHardClash,
      "hardLevelDetail": levelDetailHard,
      "hardLevelBSDetail": levelBSDetailHard,
    };
    var ref = firebase.database().ref(pNumber + "/" + reportDate);
    ref.set(dataSheet);
    var latestRef = firebase.database().ref(pNumber + "/latest");
    latestRef.set({
      "all": allCount,
      "hard": hardCount,
      "date": reportDate
    })
  })
}

