const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

const router = require("./routes/route")



app.use(bodyParser.json())
app.use("/",router)
app.use(cors)

mongoose.connect("mongodb+srv://spacespider:admin@cluster0.0ps1ymn.mongodb.net/react-assignment-2",{useNewUrlParser:true})
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err))



app.listen(4000,()=>{
    console.log("express running on " +4000)
})
