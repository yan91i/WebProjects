
window.onload=function(){

  chrome.storage.sync.get('emailAddress',function(data){
        document.getElementById('emailAddress').value=data.emailAddress;
  });

  chrome.storage.sync.get('timeInterval',function(data){
      if(data==undefined||data==null)
        data='';
      document.getElementById('timeInterval').value=data.timeInterval;
  });

 document.getElementById('btStart').onclick=function(){
    chrome.storage.sync.set({timeInterval:document.getElementById('timeInterval').value});    
    var myemail=document.getElementById("emailAddress").value;
    if(fcheckMail(myemail)!==true){
      alert('邮箱格式不正确！');
    }else{
      chrome.storage.sync.set({emailAddress:document.getElementById('emailAddress').value});
      chrome.extension.sendMessage({message:'btStart_click'});
    }
  };
  
  document.getElementById('btStop').onclick=function(){
    chrome.extension.sendMessage({message:'btStop_click'});
  };

  function fcheckMail(myemail){
    var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    var check=reg.test(myemail);
    return check;
  }
};
