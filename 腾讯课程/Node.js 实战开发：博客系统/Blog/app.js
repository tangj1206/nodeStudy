// 应用程序启动入口文件

// 加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//创建app应用
var app = express();

//设置静态文件托管
// 当用户访问的url以/public开始,那么直接返回对应__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'));

//配置模板
//定义当前应用使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀
// 第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);

//设置模板文件存放的目录
app.set('views', './views')
//注册所使用的模板引擎
app.set('view engine', 'html');
//在开发过程中需要取消模板缓存
swig.setDefaults({
    cache: false
});

//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
// app.use('/',require('./routers/main'));

mongoose.connect();
//监听app请求
app.listen(8081);