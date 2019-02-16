import Notify from '../../vant/notify/notify';

const app = getApp();

Page({

  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: "授权登录"
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取用户信息
   */
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      });
      //全局
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.logged = true;
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: function(res) {
          app.globalData.openid = res.result.openid
          wx.navigateBack({
            delta: 1
          });
        }
      });
    } else {
      Notify({
        text: '授权失败',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: 'red'
      });
    }
  }
})