/**
 * Created by SYT on 2018/1/21.
 */
var http = require('http')
var util = require('util')

http.get('http://www.imooc.com/index/getstarlist', function (res) {
  var data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    try {
      var result = JSON.parse(data)
      console.log('result:' + util.inspect(result.data))
    } catch (e) {}
  })
})
