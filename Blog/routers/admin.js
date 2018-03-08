var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');

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
    

    //从数据库读取所有分类数据
    // limit(number):限制获取的数据条数
    //skip(number):忽略数据的条数

    var page = Number(req.query.page) || 1;
    var limit = 2;
    var pages = 0;

    Category.count().then(function (count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;
        
        Category.find().limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,

                count:count,
                pages:pages,
                limit:limit,
                page: page
            });
        });
    });
});
/** 
 * 分类的添加
*/
router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
})
/** 
 * 分类的保存
*/
router.post('/category/add',function (req, res) {
    var name = req.body.name || '';

    if (name == '') {
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name:name
    }).then(function (rs) {
        if (rs) {
            //数据库中已经存在该分类了
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类已经存在了'
            })
            return Promise.reject();
        }else{
            //数据库中不存再该分类，可以保存
            return new Category({
                name:name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'分类保存成功',
            url:'/admin/category'
        })
    })
});
/** 
 * 分类修改
*/
router.get('/category/edit',function (req, res) {
    
    //获取要修改分类的信息,并且用表单的形式展现出来
    var id= req.query.id || '';

    //获取需要修改的分类信息
    Category.findOne({
        _id:id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return;
        }else{
            res.render('admin/category_edit',{
                userInfo:req.userInfo,
                category:category
            });
            return;
        }
    })
})

/*
* 分类的修改保存
* */
router.post('/category/edit', function(req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function(category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        } else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                });
            }
        }
    }).then(function(sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                name: name
            });
        }
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    }).catch(function (e) {
        console.log(e);
    })

});


/**
 * 分类删除
 */
module.exports = router;