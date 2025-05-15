
var hasInject=false;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if(request.message=="btStart_click")
    {
      stopTimer();
      chrome.tabs.insertCSS(null,{file:"css/page.css"});
      chrome.tabs.executeScript(null,{file:"scripts/jquery-1.12.1.min.js"});
      chrome.tabs.executeScript(null,{file:"scripts/page.js"});
      hasInject=true;
    }
    
    if(request.message=="PageChangedEvent")
    {
      chrome.storage.sync.get('emailAddress',function(data){
        sendMail(data.emailAddress,'您监控的网页发生了改变','您监控的网页发生了改变,网页地址：'+request.url);
      });
      
      playNotification();
    }
    
    if(request.message=="btStop_click")
    {
      stopTimer();
    }
      
 });
 
 function stopTimer(){
   if(hasInject) //如果之前未注入gs.js，会报错
        chrome.tabs.executeScript(null,{code:"stopTimer();"}); 
 }
 
 this.audio=null;
 function playNotification(){
    if(this.audio==null){
      this.audio=new Audio('files/attention.mp3');
      this.audio.loop=true;
      this.audio.play();
    }
    
    var options={ 
          lang: "utf-8",
          icon: "images/eye.png",
          body: "您监控的网页内容发生了改变！"
      };
    var n = new Notification("网页监控助手提醒！", options); 
    n.onclose=function(d){
      if(window.audio!=null)
      {
        window.audio.pause();
        window.audio=null;
      }
    };
 }
 
 function sendMail(receiver,subject,message){
   $.post('http://mail.liyumeng.me/SendMail','token=7F830C40B1594B05901779C1D24E2940&receivers='+receiver+'&subject='+subject+'&message='+message,function(dat){console.log(dat);});
 }
