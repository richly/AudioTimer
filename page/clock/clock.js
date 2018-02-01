//logs.js
const util = require('../../util/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
  //自定义方法
  ,navigateToAudioTimer:function(){
    console.log("跳转到语音倒计时页");
  }
})
