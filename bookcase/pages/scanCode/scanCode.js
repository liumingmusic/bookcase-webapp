// todo/pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "扫码识书"
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

  /************自定义事件**************/
  scanCode: function(event) {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ["barCode"],
      success(res) {
        wx.showLoading({
          title: '数据读取中',
          mask: true
        });
        // 调用云函数
        wx.cloud.callFunction({
          name: 'bookInfo',
          data: {
            isbn: res.result
          },
          success: res => {
            var bookInfo = JSON.parse(res.result);
            // 添加到数据库中
            const db = wx.cloud.database();
            // 添加创建时间
            bookInfo.createTime = db.serverDate()
            //添加记录
            db.collection('todo_collection').add({
              data: bookInfo,
              success(res) {
                wx.hideLoading();
                wx.showToast({
                  title: "书籍添加成功",
                  icon: 'success',
                  duration: 2000
                });
              },
              fail: err => {
                console.log(err);
              }
            })
          },
          fail: err => {
            console.log(err);
          }
        })
      },
      fail: function(err) {
        console.log(err);
      }
    })
  }
})