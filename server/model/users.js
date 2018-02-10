var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId": {type: String},
      "productName": String,
      "salePrice": Number,
      "checked": String,
      "productImage": String,
      "productNum": String,
      "productLink":String,
      "comment": Number
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model("User",userSchema);
