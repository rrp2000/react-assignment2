const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    phone:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    }
},{timestamps:true})

module.exports = new mongoose.model("Student", studentSchema)