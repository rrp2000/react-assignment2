const express = require("express")
const router = express.Router()
const middleware = require("../middlewares/auth")
const adminController = require("../controllers/adminController")
const questionController = require("../controllers/questionController")
const studentController = require("../controllers/studentController")
const userController = require("../controllers/userController")


router.post("/admin/register",adminController.adminRegister)
router.post("/admin/login",adminController.adminLogin)


router.post("/questions", middleware.auth,questionController.createQuestion)
router.get("/questions",middleware.auth, questionController.getQuestions)
router.get("/question/:id",middleware.auth, questionController.getQuestion)
router.put("/questions",middleware.auth, questionController.updateQuestions)


router.post("/student/register", studentController.studentRegister)
router.post("/student/login", studentController.studentLogin)


router.get("/user",middleware.auth,userController.getUser)


module.exports = router