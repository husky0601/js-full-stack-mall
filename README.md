# 项目介绍
- 作为前端的菜鸟，每每看到Github上有很多大神分享着自己的项目时，内心都是蠢蠢欲动，这次终于下定决心要给自己一段时间来完成属于自己的一份作品。  
- 于是在查找了大量资料，思考着技术选型，终于决定做一个展现商品的web全栈网站。  
- 此网站的商品名称、商品价格、商品价格等商品信息均是通过node爬虫获取到，然后根据自己需求设计数据库模型，并将其导入而获取到的数据并展现出来。该网站实现了一般商城最最最基本的功能：注册、登录与退出功能，购物车的添加与修改，前端实时计算购物车数量并展现，地址列表的增加与删除，订单列表的生成，下单以及查询下单成功等功能。当然这个网站还有许许多多需要完善并增加的功能，在此之后也会不断去完善这个网站。
- 在此过程中遇到很多困难，当每每告诫自己需要静下心来，明确问题所在，并多查看相关文档与问题，找到问题所在，并记录下来，之后会整理一下在这个项目中个人遇到的问题及解决的办法。所幸的是问题都已经解决，项目也顺利部署。


##### 

## 线上地址展示
####    线上前端项目地址：[Husky Market](http://47.52.43.40/#/)

## 代码安装与部署

``` bash
# 克隆地址
git clone https://github.com/husky0601/js-full-stack-mall.git

#进入项目文件
cd js-full-stack-mall

# 安装依赖
npm install

# 运行项目
npm run dev
``` 

## 技术栈
#### 前端:
[SVG](http://www.runoob.com/svg/svg-tutorial.html) + [Sass](https://www.sass.hk/docs/) + [Flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) + Vue全家桶（[vue](https://cn.vuejs.org/) + [vuex](https://vuex.vuejs.org/zh-cn/) + [vue-router](https://router.vuejs.org/zh-cn/)+ [axios](https://www.npmjs.com/package/axios)）+ [webpack](https://doc.webpack-china.org/)
#### 后端JS：
[Node.js](http://nodejs.cn/api/) + [Express](http://www.expressjs.com.cn/)
#### 数据库: 
[Mongodb](https://docs.mongodb.com/) + [mongoose](http://mongoosejs.com/)

## 项目架构
### 前端vue项目架构
```
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── assets                                  // 样式目录
│   ├── components                              // 公用组件
│   │   ├── Header.vue                          // 头部组件
│   │   ├── Bread.vue                           // 面包屑组件
│   │   ├── Footer.vue                          // 底部组件
│   │   ├── Modal.vue                           // 模态框组件
|   |   |—— LoadderMore.vue                     // 加载更多
│   ├── router                                  // 路由目录
│   │   ├── index.js                            // 路由配置
│   ├── util                                    // 工具插件目录
│   │   ├── currency.js                         // 格式化价格工具
│   ├── views                                   // 主要页面
│   │   ├── Login.vue                           // 注册与登录页
│   │   ├── GoodsList.vue                       // 商品列表页
│   │   ├── AddAddress.vue                      // 添加地址页
│   │   ├── Cart.vue                            // 购物车页
│   │   ├── Address.vue                         // 收货地址页
│   │   ├── OrderConfirm.vue                    // 下单页
│   │   ├── orderSuccess.vue                    // 下单成功页
│   ├── App.vue                                 // 总组件（渲染页面）
│   ├── main.js                                 // 入口文件
├── static                                      // 静态资源目录
├── index.html                                  // html入口文件
├── favicon.ico                                 // 图标
├── package.json                                // 依赖文件
```

### 后端Express项目架构
```
├── bin                                         // 主文件
│   ├── www                                     // 项目的入口文件
├── model                                       // 数据模型
│   ├── users.js                                // 用户数据模型
│   ├── goods.js                                // 商品数据模型
├── public                                      // 共有静态资源
├── router                                      // 路径接口
│   ├── goods.js                                // 商品路径接口
│   ├── users.js                                // 用户路径接口
├── utils                                       // 全局共有方法
│   ├── utils.js                                // 全局共有方法
├── views                                       // 页面展示
|—— app.js                                      // express主文件
├── package.json                                // 依赖文件
```

## 基本功能
### 前端功能
- [x] 响应式布局
- [x] 注册、登录、退出
- [x] 加入购物车、购物车结算
- [x] 地址增加、删除
- [x] 下单功能
- [ ] 商品详情
- [ ] 商品分类展示
- [ ] 个人中心  
> ......思考ING  

### 后端功能
- [x] 全局登录拦截
- [x] 用户注册、登录、退出
- [x] 商品过滤、查询
- [x] 购物车列表的增加、修改、删除
- [x] 订单生成、查询
- [ ] 商品详情图片的获取
- [ ] 订单管理
>  ......思考ING