// pages/clock/audioTimer/audioTimer.js
const util = require('../../../../util/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskName: '',
    timeArray: [180, 120, 60, 30,1],
    index: 1,
    items: [[
      { value: 60, name: '倒数1小时', checked: 'true' },
      { value: 30, name: '倒数30分钟', checked: 'true' },
      { value: 15, name: '倒数15分钟', checked: 'true' },
      { value: 5, name: '倒数5分钟', checked: 'true' }
    ], [
      { value: 60, name: '倒数1小时', checked: 'true' },
      { value: 30, name: '倒数30分钟', checked: 'true' },
      { value: 15, name: '倒数15分钟', checked: 'true' },
      { value: 5, name: '倒数5分钟', checked: 'true' }
    ], [
      { value: 30, name: '倒数30分钟', checked: 'true' },
      { value: 15, name: '倒数15分钟', checked: 'true' },
      { value: 5, name: '倒数5分钟', checked: 'true' }
    ], [
      { value: 15, name: '倒数15分钟', checked: 'true' },
      { value: 5, name: '倒数5分钟', checked: 'true' }
    ],[
      // { value: 1, name: '倒数1分钟', checked: 'true' }
    ]
    ],
    warnTimes: [],
    startTime: '12:01',
    endTime: '0:00'
  }

  , onLoad: function () {
    // // 选择时间初始化
    // var currentTime = util.curTime();
    // this.setData({
    //   startTime: currentTime
    //   , endTime: currentTime
    // });
  }

  , timePickerChange: function (e) {
    // console.log('chosen:', e.detail.value);

    this.setData({
      index: e.detail.value
    });
  }

  , timeCheckboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var items = this.data.items, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }
    this.setData({
      items: items
    });
  }

  , startTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
      , endTime: e.detail.value
    });
  }

  , endTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    });
  }

  , formSubmit: function (e) {
    console.log("formSubmit");
    var app = getApp();
    var startTime = util.getTimestamp(new Date());
    //（开始时间和持续时间）--> 提醒时间点和结束时间
    var taskTime = this.data.timeArray[this.data.index] * 60;
    var endTime = startTime + taskTime;
    var warnTimes = [];
 
    for (var i = 0, len = this.data.items[this.data.index].length; i < len; i++) {
      if (this.data.items[this.data.index][i].checked === 'true') {
        var tempTime = startTime + taskTime - this.data.items[this.data.index][i].value * 60;
        warnTimes.push(tempTime);
      }
    }

    app.taskName = e.detail.value.input;
    app.startTime = startTime;
    app.endTime = endTime;
    app.warnTimes = warnTimes;

    console.log("任务名：", app.taskName,
      "开始时间：", app.startTime,
      "任务时长：", this.data.timeArray[this.data.index],
      "结束时间：", app.endTime,
      "提醒时间点：", app.warnTimes);
    wx.navigateTo({
      url: './audioTimerOn/audioTimerOn',
    })
  }

  , formReset: function (e) {
    //重置picker
    this.setData({
      index: 1
    });
  }
  
})
