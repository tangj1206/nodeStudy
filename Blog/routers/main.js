var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');
/**
 * 首页
 */
router.get('/', function (req, res, next) {
    var data = {
        userInfo: req.userInfo,
        categories: [],

        count: 0,
        page: Number(req.query.page || 1),
        limit: 1,
        pages: 0
    }


    //读取所有分类信息
    Category.find().then(function (categories) {

        data.categories = categories;

        return Content.count();

    }).then(function (count) {

        data.count = count;

        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        return Content.find().sort({
            addTime: -1
        }).limit(data.limit).skip(skip).populate(['category', 'user']);

    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data);
    })
});

module.exports = router;