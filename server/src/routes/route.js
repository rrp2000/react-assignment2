const express = require("express")
const router = express.Router()
const middleware = require("../middlewares/auth")
const adminController = require("../controllers/adminController")
const questionController = require("../controllers/questionController")
const studentController = require("../controllers/studentController")
const userController = require("../controllers/userController")


router.post("/admin/register",adminController.adminRegister)
router.post("/admin/login",adminController.adminLogin)


router.post("/questions", questionController.createQuestion)
router.get("/questions", questionController.getQuestions)
router.put("/questions", questionController.updateQuestions)


router.post("/student/register", studentController.studentRegister)
router.post("/student/login", studentController.studentLogin)


router.get("/user",middleware.auth,userController.getUser)


module.exports = router