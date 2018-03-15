var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    
    //关联字段-内容分类的ID
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Category'
    },

    //标题
    title:String,

    //关联字段 - 用户id
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    addTime:{
        type:Date,
        default:new Date()
    },

    //阅读量
    views:{
        type:Number,
        default:0
    },

    //简介
    description:{
        type:String,
        default:''
    },
    
    //内容
    content:{
        type:String,
        default:''
    },

    //评价
    comments:{
        type:Array,
        default:[]
    }
})