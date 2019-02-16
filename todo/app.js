//app.js
App({
  onLaunch: function() {
    // 全局变量
    let _that = this;
    _that.globalData = {};
    // 判断微信版本
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  }
})