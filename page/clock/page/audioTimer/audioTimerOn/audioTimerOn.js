// page/clock/page/audioTimer/page/audioTimerOn.js
const util = require('../../../../../util/util.js');
var example = require('./timerCanvas.js');

Page({
  data: {
    taskName: '',
    leftTimeStr: '',
    restTime:0,//在onShow和onHide之间传递用
    interval:null
  }

  ,onLoad: function(){
    var app = getApp();
    this.setData({
      restTime: app.endTime - app.startTime
    });
  }
  , onShow: function () {
    // clearInterval(hideInt);
    //开始时间、当前时间计算剩余时间
    var app = getApp(),
        startTime = app.startTime,
        endTime = app.endTime,
        leftTime = this.data.restTime,
        leftHH, 
        leftMM, 
        leftSS, 
        leftHHStr, 
        leftMMStr, 
        leftSSStr,
        that = this;

    that.setData({
      taskName: app.taskName
    });

    var showInt = setInterval(function () {

      leftHH = Math.floor(leftTime / 3600);
      leftMM = Math.floor((leftTime - leftHH * 3600) / 60);
      leftSS = leftTime - leftHH * 3600 - leftMM * 60;

      leftHHStr = '' + leftHH;
      leftMMStr = '' + leftMM;
      leftSSStr = '' + leftSS;

      if (leftHH < 10) { leftHHStr = '0' + leftHH; }
      if (leftMM < 10) { leftMMStr = '0' + leftMM; }
      if (leftSS < 10) { leftSSStr = '0' + leftSS; }

      that.setData({
        leftTimeStr: leftHHStr + ':' + leftMMStr + ':' + leftSSStr
      });

      //提醒时间点提示，匹配当前时间戳
      for(var i = 0,l = app.warnTimes.length;i<l;i++){
        if((app.warnTimes[i]-startTime)==leftTime){
          util.warnLeftTime(leftTime/60, app.taskName);
        }
      }

      leftTime--;

      //任务结束提示
      if (leftTime < 1) {
        util.warnLeftTime(0, app.taskName);
        clearInterval(showInt);
      }

      that.setData({
        restTime: leftTime
      });
    }, 1000);
  }
  , onHide:function() {
    setTimeout(function(){
      util.warnLeftTime(0, app.taskName);
    },3000);
    // clearInterval(showInt);
    // var app = getApp(),
    //     startTime = app.startTime,
    //     endTime = app.endTime,
    //     leftTime = this.data.restTime,
    //     that = this;
    // console.log("onHide执行:"+leftTime);
    // var hideInt = setInterval(function(){
    //   console.log("onHide:"+leftTime);
    //   for (var i = 0, l = app.warnTimes.length; i < l; i++) {
    //     if ((app.warnTimes[i] - startTime) == leftTime) {
    //       console.log("util.warnLeftTime:" + leftTime / 60 +","+app.taskName);
    //       util.warnLeftTime(leftTime / 60, app.taskName);
    //     }
    //   }

    //   leftTime--;

    //   //任务结束提示
    //   if (leftTime < 0) {
    //     console.log("util.warnLeftTime:" + 0 + "," + app.taskName);
    //     util.warnLeftTime(0, app.taskName);
    //     clearInterval(hideInt);
    //   }

    //   that.setData({
    //     restTime:leftTime
    //   });
    // },1000);
  }
})