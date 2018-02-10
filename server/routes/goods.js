/**
 * Created by SYT on 2018/1/23.
 */
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("../model/goods");
var Users = require("../model/users")

//连接MongoDB数据库
mongoose.connect("mongodb://localhost/demo");
var db = mongoose.connection;
db.on("open", function () {
  console.log("MongoDB connected success!");
});
db.on("error", function () {
  console.log("MongoDB connected fail");
});

/* 查询商品列表数据 */
router.get("/list", function (req, res, next) {
  let page = parseInt(req.query.page)
  let pageSize = parseInt(req.query.pageSize)
  let skip = (page - 1) * pageSize
  let sort = req.query.sort
  let typeAll = req.query.typeAll
  let goodsType = req.query.goodsType
  // let priceGt = req.query.priceGt
  // let priceLte = req.query.priceLte
  let params = {};
  if (typeAll !== "all") {
    params = {
      productName: {
        $regex: goodsType,
      }
    };
  }
  
  let goodModel = Goods.find(params)
    .skip(skip)
    .limit(pageSize)
    .sort({salePrice: sort})
    // .aggregate({$sort:{salePrice:sort}})
    .exec(function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        });
      } else {
        res.json({
          status: "0",
          msg: "查询成功",
          result: {
            count: doc.length,
            list: doc
          }
        });
      }
    });
});

/* 加入购物车 */
router.post('/addCart', function (req, res, next) {
  let userId = req.cookies.userId
  let productId = req.body.productId
  Users.findOne({userId:userId}, function (err,userDoc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
       if(userDoc){
        var goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId}, function (err1,doc) {
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                // console.log('userDoc.cartList:' + userDoc.cartList)
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
                })
              }
            }
          });
        }
      }
    }
  })
})

module.exports = router;
