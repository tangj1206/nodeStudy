var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/', function (req, res, next) {
    Category.find().then(function ( categories ) {

        //读取所有分类信息


        res.render('main/index', {
            userInfo: req.userInfo,
            categories:categories
        });
    })
});

module.exports = router;