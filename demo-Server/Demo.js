/**
 * Created by SYT on 2018/1/21.
 */
var http = require('http')
var url = require('url')
// let util = require('util')
var fs = require('fs')
// var data = fs.readFile('index.html', 'utf8', function (err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })
var server = http.createServer((req,res) => {
  // res.statusCode = 200
  // res.setHeader("Content-Type","text/plain;charset=utf-8")
  // console.log("requrl:" + req.url)
  // console.log("parse:" + url.parse(req.url,true))
  // console.log("inspect:" + util.inspect(url.parse(req.url)))

  var pathname = url.parse(req.url).pathname
  console.log(pathname.substring(1))
  fs.readFile(pathname.substring(1), function (err, data) {
    if(err) {
      res.writeHead(404, {
        'Content-Type':'text/html'
      })
      console.log(err)
    } else {
      res.writeHead(200, {
        'Content-Type':'text/html'
      })
      res.write(data)
    }
    res.end()
  })

})
server.listen(1995, function () {
  console.log("服务器已经开启，地址是localhost:1995")
})
