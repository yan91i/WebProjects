var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: []
  },
  mounted: function () {
    var self = this;
    self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 , mirror:false});
    self.scanner.addListener('scan', function (content, image) {
      self.scans.unshift({ date: +(Date.now()), content: content });
      // START
      window.sheetNum=content.replace("https://doctracking-scanner.firebaseapp.com/?","");
      // Initialize Div
      document.getElementById("sheetHead").innerHTML = null;
      // Get Search Number
      var searchNum=sheetNum;
      // 获取数据
      var firebaseRef = firebase.database().ref();
      firebaseRef.child(window.sheetNum).on('value', function(snapshot) {
        // TO DO: Error判断
        var checkNum=snapshot.child("Creator").val();
        if (checkNum == null){
          window.alert("No such a circulation has been found!");
        } else{
        document.getElementById("header").style.display="none";
        document.getElementById("first-div").style.display="none";
        document.getElementById("task-div").style.display="block";
        document.getElementById("register-div").style.display="none";

        var sheetCreator=snapshot.child("Creator").val();
        var sheetProjectNum=snapshot.child("ProjectNumber").val();
        var sheetProjectName=snapshot.child("ProjectName").val();
        var sheetDocName=snapshot.child("DocumentName").val();
        document.getElementById("sheetHead").innerHTML = 
          '<h5>Circulation Number: ' + searchNum + '</h5>'+
          '<h5>Creator: ' + sheetCreator + '</h5>'+
          '<h5>Project: ' + sheetProjectNum + ' ' + sheetProjectName + '</h5>'+
          '<h5>Document Name: ' + sheetDocName + '</h5>'+
          '<br>';
  
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
      }
  
    });
      // END
      
    });

    // Catch Camera Info
    Instascan.Camera.getCameras().then(function (cameras) {
      self.cameras = cameras;
      if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id;
        self.scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  },

  
  methods: {
    formatName: function (name) {
      return name || '(unknown)';
      
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id;
      this.scanner.start(camera);
    }
  }
});

