const adminModel = require("../models/adminModel")
const studentModel = require("../models/studentModel")


//--------------------------------------------get user------------------------------------------------------

let getUser = async(req,res)=>{
    let decodedToken = req.decodedToken  
    let data= await adminModel.findById(decodedToken.userId) || await studentModel.findById(decodedToken.userId)
    if(!data) return res.status(401).send({ status: false, message: "invalid User" });
    let {
      _id,
      firstName,
      lastName,
      phone,
      email,
      password
    } = data
  
    return res.status(200).send({"_id":_id,"firstName":firstName,"lastName":lastName,"phone":phone,"email":email,"password":password,"isAdmin":decodedToken.isAdmin})
  }

  module.exports = {getUser}