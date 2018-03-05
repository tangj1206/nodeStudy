var express = require('express');
var router = express.Router();
var User = require('../models/User');

//统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

//用户注册
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
    }

    //密码是否为空
    if (password == '') {
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
    }

    //重复密码是否为空
    if (repassword == '') {
        responseData.code = 1;
        responseData.message = '重复密码不能为空';
        res.json(responseData);
    }

    //两次输入的密码是否一致
    if (repassword != password) {
        responseData.code = 1;
        responseData.message = '两次输入密码不一致'
        res.json(responseData);
    }

    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，则表示该用户名被注册了
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            //表示数据库有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return ;
        }
        //保存用户数据信息
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function (newUserInfo) {
        responseData.message = '用户注册成功';
        res.json(responseData);
    });
});
module.exports = router;