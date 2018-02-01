//baidu 语音参数配置
const BaiduAudioSynthesisURL = "http://tsn.baidu.com/text2audio";
const BaiduAudioAppKey = "2DGiison5UwLjgxi2d8iAZDo";
const BaiduAudioAppSecret = "a0d299726203c8e443daf03d5b3bd494";
const BaiduAudioGetTokenURL = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials" + "&client_id=" + BaiduAudioAppKey + "&client_secret=" + BaiduAudioAppSecret;

const warnLeftTime = (n,taskName) => {
  //请求参数
  var BaiduAudioAccessToken, BaiduAudioExpiresIn, BaiduAudioRefreshToken,
    BaiduAudioScope, BaiduAudioSessionKey, BaiduAudioSessionSecret;
  var requestTask = wx.request({
    url: BaiduAudioGetTokenURL,
    success: function (res) {
      BaiduAudioAccessToken = res.data.access_token;
      BaiduAudioExpiresIn = res.data.expires_in;
      BaiduAudioRefreshToken = res.data.refresh_token;
      BaiduAudioScope = res.data.scope;
      BaiduAudioSessionKey = res.data.session_key;
      BaiduAudioSessionSecret = res.data.session_secret;
    },
    fail: function (res) {
      console.log("fail");
      console.log(res);
    },
    complete: function (res) {
      var tex;
      if(n>0){
        tex = "现在离" + taskName +"结束还剩" + n + "分钟";
      }else{
        tex = taskName + "结束";
      }
       
      var encodeTex = encodeURI(tex);
      // cuid:用户唯一标识，用来区分用户，计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内
      var cuid = "00001";
      var getFileURL = BaiduAudioSynthesisURL + "?tex=" + encodeTex
        + "&lan=zh&cuid=" + cuid
        + "&ctp=1&tok=" + BaiduAudioAccessToken;
      //下载并播放mp3文件 
      wx.downloadFile({
        url: getFileURL,
        success: function (res) {
          if (res.statusCode === 200) {
            var innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.autoplay = true;
            innerAudioContext.src = res.tempFilePath;
            innerAudioContext.onPlay(() => {
              console.log('开始播放');
            })
            innerAudioContext.onError((res) => {
              console.log(res.errMsg);
              console.log(res.errCode);
            })
          }
        }
      });
    }
  });

}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTimestamp = date => {
  return Math.round(date.getTime() / 1000);
}

const getHMTime = date => {
  var time;
  //解决12:02错误显示为12:2等类似情况
  if (date.getMinutes() < 10) {
    time = date.getHours() + ':0' + date.getMinutes();
  } else {
    time = date.getHours() + ':' + date.getMinutes();
  }
  return time;
}

module.exports = {
  warnLeftTime: warnLeftTime,
  formatTime: formatTime,
  formatNumber: formatNumber,
  getTimestamp: getTimestamp,
  getHMTime: getHMTime
}
