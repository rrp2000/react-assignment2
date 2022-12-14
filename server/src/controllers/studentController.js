const studentModel = require("../models/studentModel")
const jwt = require("jsonwebtoken");

const onlyLetters = /^[A-Za-z]+$/;
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//-------------------------register student--------------------------

const studentRegister = async (req,res) =>{
    try {
        let studentData = req.body
        let {
            firstName,
            lastName,
            phone,
            email,
            password
        } = studentData

        //validations for firstName
        if(!firstName) return res.status(400).send({status:false,message:"First name is required."})
        if(typeof firstName!=="string") return res.status(400).send({status:false,message:"First name should be a string."})
        if(firstName.length==0) return res.status(400).send({status:false,message:"First name can't be empty."})
        if(!onlyLetters.test(firstName)) return res.status(400).send({status:false,message:"First name can only contain letters."})

        //validations for lastName
        if(!lastName) return res.status(400).send({status:false,message:"Last name is required."})
        if(typeof lastName!=="string") return res.status(400).send({status:false,message:"Last name should be a string."})
        if(lastName.length==0) return res.status(400).send({status:false,message:"Last name can't be empty."})
        if(!onlyLetters.test(lastName)) return res.status(400).send({status:false,message:"Last name can only contain letters."})

        //validations for phone
        if(!phone) return res.status(400).send({status:false,message:"Phone is required."})
        if(typeof phone!=="string") return res.status(400).send({status:false,message:"Phone should be a string."})
        if(phone.length!=10) return res.status(400).send({status:false,message:"Phone should be of 10 digits."})
        if(await studentModel.findOne({phone:phone})) return res.status(400).send({status:false,message:"Phone already exists."})

        //validations for email
        if(!email) return res.status(400).send({status:false,message:"Phone is required."})
        if(typeof email!=="string") return res.status(400).send({status:false,message:"Phone should be a string."})
        if(!validEmail.test(email)) return res.status(400).send({status:false,message:"Enter a valid email."})
        if(await studentModel.findOne({email:email})) return res.status(400).send({status:false,message:"Email already exists."})


        //validations for password
        if(!password) return res.status(400).send({status:false,message:"Password is required."})
        if(typeof password!=="string") return res.status(400).send({status:false,message:"Password should be a string."})
        if(password.length<8 || password.length>15) return res.status(400).send({status:false,message:"password should be between 8 to 15 characters."})

        let createdData = await studentModel.create(studentData)
        return res.status(201).json(createdData)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


//-------------------------------------student login-----------------------------------------

let studentLogin = async (req,res) =>{
    try {
        let loginDetails = req.body
        let {
            email,
            password
        } = loginDetails

        let studentData = await studentModel.findOne({email:email, password:password})
        if(!studentData) return res.status(409).send({status:false, message:"Invalid credentials"})

        let token = jwt.sign({userId: studentData._id, isAdmin:false},"questionAnswer")
        return res.status(200).send({staus:true, token:token})
        
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}
module.exports = {studentRegister,studentLogin}