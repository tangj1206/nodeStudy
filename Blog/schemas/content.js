var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    
    //关联字段-内容分类的ID
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Content'
    },

    //标题
    title:String,
    //简介
    description:{
        type:String,
        default:''
    },
    //内容
    content:{
        type:String,
        default:''
    }
})