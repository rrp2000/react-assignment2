const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim:true
    },
    ans1:{
        type:String,
        required:true,
        trim:true
    },
    ans2:{
        type:String,
        required:true,
        trim:true
    },
    ans3:{
        type:String,
        required:true,
        trim:true
    },
    ans4:{
        type:String,
        required:true,
        trim:true
    },
    answer:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true})

module.exports = new mongoose.model("Question", questionSchema)