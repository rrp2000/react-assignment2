const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  try {
    let token = req.headers["x-api-key"]
    if(!token) return res.status(401).send({status:false,message:"Token is required."})
    jwt.verify(token,"questionAnswer",(err,decodedToken)=>{
        if(err) return res.status(401).send({ status: false, message: "invalid Token" });
        req.decodedToken= decodedToken
        next()
    })
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports= {auth}
