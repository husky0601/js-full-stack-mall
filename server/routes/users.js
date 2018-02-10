var express = require("express");
var router = express.Router();
var User = require("../model/users");
require("../util/util");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("This is User Web");
});

//登录请求
router.post("/login", function(req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne({ userName: param.userName }, (err, doc) => {
    //判断用户名和密码是否匹配
    // if (param.userPwd) {
    console.log("userName:" + doc.userName, " userPwd:" + doc.userPwd);
    if (doc.userPwd === param.userPwd) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        });
      } else {
        //设置cookie
        if (doc) {
          res.cookie("userId", doc.userId, {
            path: "/",
            maxAge: 1000 * 60 * 60
          });
          res.cookie("userName", doc.userName, {
            path: "/",
            maxAge: 1000 * 60 * 60
          });
          // req.session.user = doc
          res.json({
            status: "0",
            msg: "登录成功",
            result: {
              userName: doc.userName
            }
          });
        }
      }
    } else {
      res.json({
        status: "1001",
        msg: "密码错误"
      });
    }
    // }
  });
});

//注册账户
router.post("/signIn", function(req, res, next) {
  var userName = req.body.userName,
    userPwd = req.body.userPwd;
  console.log("usrName:" + userName, "userPwd:" + userPwd);
  User.findOne({ userName: userName }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ""
      });
    } else if (doc) {
      res.json({
        status: "1001",
        msg: "用户名已存在",
        result: ""
      });
    } else {
      var userTime = new Date().Format("yyyyMMdd"),
        r1 = Math.floor(Math.random() * 100),
        platform = "10",
        userId = platform + r1 + userTime,
        user = {
          userName: userName,
          userPwd: userPwd,
          userId: userId
        };
      User.create(user, function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: err1.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "用户注册成功",
            result: "用户注册成功"
          });
        }
      });
    }
  });
});

// 退出登录
router.post("/logout", function(req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: "成功退出",
    result: ""
  });
});

//检查用户是否是登录状态
router.get("/checkLogin", function(req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: "0",
      msg: "",
      result: {
        userName: req.cookies.userName || ""
      }
    });
  } else {
    res.json({
      status: "1001",
      msg: "未登录",
      result: ""
    });
  }
});

//查询当前用户购物车数据
router.get("/cart", function(req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        message: "成功获取购物车数据",
        result: doc.cartList
      });
    }
  });
});

//删除购物车商品
router.post("/cart/del", function(req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId;
  delCart = {
    $pull: {
      cartList: {
        productId: productId
      }
    }
  };
  User.update({ userId: userId }, delCart, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        msg: "删除成功",
        result: "删除成功"
      });
    }
  });
});

//修改购物车商品信息
router.post("/cart/edit", function(req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  // console.log('userId:' + userId, 'productId:' + productId, 'productNum:' + productNum)
  User.update(
    { userId: userId, "cartList.productId": productId },
    {
      "cartList.$.productNum": productNum,
      "cartList.$.checked": checked
    },
    function(err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        });
      } else {
        res.json({
          status: "0",
          msg: "",
          result: "suc"
        });
      }
    }
  );
});

//选择全部的商品
router.post("/cart/checkAll", function(req, res, next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll ? "1" : "0";
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (doc) {
        doc.cartList.forEach(item => {
          item.checked = checkAll;
        });
        doc.save(function(err1, doc1) {
          if (err1) {
            res.json({
              status: "1",
              msg: err1.message
            });
          } else {
            res.json({
              status: "0",
              msg: "",
              result: "success"
            });
          }
        });
      }
    }
  });
});

//查询用户地址接口
router.get("/address", function(req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        mes: err.message,
        result: ""
      });
    } else {
      res.json({
        status: "0",
        msg: "查询成功",
        result: doc.addressList
      });
    }
  });
});

//添加用户地址接口
router.post("/address/add", function(req, res, next) {
  var userId = req.cookies.userId,
    userName = req.cookies.userName,
    streetName = req.body.streetName,
    postCode = req.body.postCode,
    tel = req.body.tel;
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      var platform = "100",
        r1 = Math.floor(Math.random() * 100),
        addressTime = new Date().Format("yyyyMMddhh"),
        addressId = platform + r1 + addressTime,
        address = {
          addressId: addressId,
          userName: userName,
          streetName: streetName,
          postCode: postCode,
          tel: tel,
          isDefault: false
        };
      doc.addressList.push(address);
      console.log(doc)
      doc.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: err1.message
          });
        } else {
          res.json({
            status: "0",
            msg: "添加地址成功",
            result: "添加地址成功"
          });
        }
      });
    }
  });
});

//设置默认地址接口
router.post("/address/default", function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        mes: err.message,
        result: ""
      });
    } else {
      doc.addressList.forEach(item => {
        if (item.addressId == addressId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      });
      doc.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1000",
            mes: err1.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            mes: "",
            result: "success"
          });
        }
      });
    }
  });
});

//删除用户地址
router.post("/address/del", function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    delAddress = {
      $pull: {
        addressList: {
          addressId: addressId
        }
      }
    };
  User.update({ userId: userId }, delAddress, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        msg: "删除成功",
        result: "删除成功"
      });
    }
  });
});

//提交订单接口
router.post("/order/pay", function(req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;

  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      var address = "",
        goodsList = [];
      // 获取用户地址
      doc.addressList.forEach(item => {
        if (addressId == item.addressId) {
          address = item;
        }
      });
      //获取选中的商品
      doc.cartList.filter(item => {
        if (item.checked == "1") {
          goodsList.push(item);
        }
      });
      //生成随机订单与时间
      var platform = "622",
        r1 = Math.floor(Math.random() * 20),
        r2 = Math.floor(Math.random() * 20),
        orderTime = new Date().Format("yyyyMMddhhmmss"),
        createTime = new Date().Format("yyyy-MM-dd hh:mm:ss"),
        orderId = platform + r1 + orderTime + r2,
        order = {
          orderId: orderId,
          addressInfo: address,
          goodsList: goodsList,
          orderTotal: orderTotal,
          createTime: createTime,
          orderStatus: "1"
        };
      doc.orderList.push(order);
      doc.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: err1.message
          });
        } else {
          res.json({
            status: "0",
            msg: "",
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          });
        }
      });
    }
  });
});

//获取订单列表
router.get("/order/suc", function(req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.query.orderId;
  User.findOne({ userId: userId }, function(err, userInfo) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      var orderList = userInfo.orderList;
      if (orderList.length > 0) {
        var orderTotal = 0;
        orderList.forEach(item => {
          // console.log(item)
          if (item.orderId == orderId) {
            orderTotal = item.orderTotal;
          }
        });
        if (orderTotal > 0) {
          res.json({
            status: "0",
            msg: "",
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          });
        } else {
          res.json({
            status: "10002",
            msg: "无此订单",
            result: "无此订单"
          });
        }
      } else {
        res.json({
          status: "10003",
          msg: "用户未创建此订单",
          result: ""
        });
      }
    }
  });
});

//获取用户的订单数量
router.get("/getCount", function(req, res, next) {
  if (req.cookies && req.cookies.userId) {
    // console.log("userId:"+req.cookies.userId);
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        });
      } else {
        var cartList = doc.cartList,
          cartCount = 0;
        cartList.map(item => {
          cartCount += parseInt(item.productNum);
        });
        res.json({
          status: "0",
          message: "success",
          result: cartCount
        });
      }
    });
  } else {
    res.json({
      status: "10001",
      msg: err.message,
      result: "当前用户不存在"
    });
  }
});

module.exports = router;
