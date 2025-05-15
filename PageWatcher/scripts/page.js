if($('#ymlInfo').length==0)
{
  $('body').prepend("<div id='ymlInfo'>网页监听助手准备运行，正在读取配置数据</div>");
}
else{
  $('#ymlInfo').html("网页监听助手准备运行，正在读取配置数据");
}
  
var timer=null;

var timeInterval=600;//刷新的时间间隔
var second=0; //当前经历的秒数
var content="网页监听助手准备运行";
var source='';  //初始网页的内容
var timerCount=0; //目前的抓取次数
var isRunning=false;
var startHour=0;
var stopHour=0;
var extInfo='';

chrome.storage.sync.get('timeInterval',function(data){
  timeInterval=data.timeInterval;
  startTimer();
});

function timeTick(){
  var time;
  if(second<60){
    time=second+"秒";
  }
  else if(second>=60 && second<3600){
    time=(parseInt)(second/60)+"分"+second%60+"秒";
  }else if(second>=3600){
    time=(parseInt)(second/3600)+"时"+(parseInt)((second%3600)/60)+"分"+(second%3600)%60+"秒";
  }
  content="网页监听助手已运行"+time+",共刷新"+timerCount+"次,每"+timeInterval+"秒刷新一次。"+extInfo;

  
  if(second%timeInterval==0)
  {
    var hour=(new Date()).getHours();
    if(hour<stopHour||hour>=startHour)
    {
      $.get(location.href,function(data){
        data=data.replace(/<!--[\s\S]+?-->/g,'');

        if(source==''){
          source=data;
        }else if(source.localeCompare(data)!=0){
          chrome.extension.sendMessage({message:'PageChangedEvent',url:location.href});
          stopTimer();
          location.reload();
        }
        timerCount++;
      });
      extInfo='';
    }else{
      extInfo="目前正处于休息时间，将于"+startHour+"点重新开始工作。";
    }
  }
  second++;
  $('#ymlInfo').html(content);
}
function startTimer(){
  isRunning=true;
  window.onbeforeunload = function(event){   
      return '当前正在监听网页，确认立即退出？'; 
  };
  timer=setInterval(timeTick,1000); //读取时间配置数据
  window.scrollTo(0,0);
}
function stopTimer(){
  clearInterval(timer);
  isRunning=false;
  window.onbeforeunload='';
}


