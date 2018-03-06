var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
})

router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

//用户管理
router.get('/user', function (req, res, next) {

    //从数据库读取所有用户数据
    // limit(number):限制获取的数据条数
    //skip(number):忽略数据的条数

    var page = Number(req.query.page) || 1;
    var limit = 2;
    var pages = 0;

    User.count().then(function (count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;
        
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,

                count:count,
                pages:pages,
                limit:limit,
                page: page
            });
        });
    });
});

/** 
 * 分类首页
*/
router.get('/category',function(req, res){
    res.render('admin/category_index',{
        userInfo:req.userInfo
    })
});
/** 
 * 分类的添加
*/
router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
})
module.exports = router;