const questionModel = require("../models/questionModel")

//----------------------------------create Question --------------------------------

const createQuestion = async (req,res)=>{
    try {
        let questionData = req.body
        let {question, ans1, ans2, ans3, ans4, answer} = questionData
    
        //validations for question
        if(!question) return res.status(400).send({ status: false, message: "Question is required" });
        if(typeof question!=="string") return res.status(400).send({status:false, message:"question should be a string"})
        if(question.length==0) return res.status(400).send({ status: false, message: "Question can't be empty" });
    
        //validations for ans1
        if(!ans1) return res.status(400).send({ status: false, message: "ans1 is required" });
        if(typeof ans1!=="string") return res.status(400).send({status:false, message:"ans1 should be a string"})
        if(ans1.length==0) return res.status(400).send({ status: false, message: "ans1 can't be empty" });
    
        //validations for ans2
        if(!ans2) return res.status(400).send({ status: false, message: "ans2 is required" });
        if(typeof ans2!=="string") return res.status(400).send({status:false, message:"ans2 should be a string"})
        if(ans2.length==0) return res.status(400).send({ status: false, message: "ans2 can't be empty" });
    
        //validations for ans3
        if(!ans3) return res.status(400).send({ status: false, message: "ans3 is required" });
        if(typeof ans3!=="string") return res.status(400).send({status:false, message:"ans3 should be a string"})
        if(ans3.length==0) return res.status(400).send({ status: false, message: "ans3 can't be empty" });
    
        //validations for ans4
        if(!ans4) return res.status(400).send({ status: false, message: "ans4 is required" });
        if(typeof ans4!=="string") return res.status(400).send({status:false, message:"ans4 should be a string"})
        if(ans4.length==0) return res.status(400).send({ status: false, message: "ans4 can't be empty" });
    
        //validations for answer
        if(!answer) return res.status(400).send({ status: false, message: "answer is required" });
        if(typeof answer!=="string") return res.status(400).send({status:false, message:"answer should be a string"})
        if(answer.length==0) return res.status(400).send({ status: false, message: "answer can't be empty" });
    
        let createdQuestion = await questionModel.create(questionData)
        return res.status(201).json(createdQuestion)
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

const getQuestions = async (req,res)=>{
    try {
        let questions = await questionModel.find()
        return res.status(200).send(questions)

    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}


const updateQuestions = async (req,res)=>{
    try {

        let data = req.body
        dataToBeUpdated = {
            question: data.question,
            ans1:data.ans1,
            ans2:data.ans2,
            ans3:data.ans3,
            ans4:data.ans4,
            answer:data.answer
        }
        console.log(dataToBeUpdated)
        let updatedData = await questionModel.findOneAndUpdate({_id:data.id},dataToBeUpdated,{new:true})
        return res.status(200).json(updatedData)
        
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

module.exports = {createQuestion,getQuestions,updateQuestions}