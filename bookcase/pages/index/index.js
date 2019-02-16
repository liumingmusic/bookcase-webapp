const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    onReady: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //准备成功
    this.setData({
      onReady: true
    });
    // 获取用户信息
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function(res) {
              //全局
              app.globalData.avatarUrl = res.userInfo.avatarUrl;
              app.globalData.userInfo = res.userInfo;
              app.globalData.logged = true;
              // 调用云函数
              wx.cloud.callFunction({
                name: 'login',
                success: function(res) {
                  app.globalData.openid = res.result.openid
                }
              });
            }
          }, 3000)
        } else {
          wx.navigateTo({
            url: '../getUserInfo/getUserInfo'
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _that = this;
    if (app.globalData.logged) {
      this.getBookList();
    } else if (_that.data.onReady || !app.globalData.logged) {
      wx.navigateTo({
        url: '../getUserInfo/getUserInfo'
      });
    }
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
  onPullDownRefresh: function() {},

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
   * 图书列表
   */
  getBookList: function() {
    let _that = this;
    const db = wx.cloud.database();
    //get book info list
    db.collection('todo_collection').where({
      _openid: app.globalData.openid.openId
    }).orderBy('createTime', 'desc').get({
      success(res) {
        _that.setData({
          bookList: res.data
        });
      }
    });
  }
})