var mongoose = require('mongoose')
var Schema = mongoose.Schema

//声明一个数据集对象
var productSchema = new Schema({
  "productId": {type: String},
  "productName": String,
  "salePrice": Number,
  "checked": String,
  "productImage": String,
  "productNum": String,
  "productLink":String,
  "comment": Number
});

module.exports = mongoose.model('Goods',productSchema)
