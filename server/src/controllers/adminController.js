const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const onlyLetters = /^[A-Za-z]+$/;
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const adminRegister = async (req, res) => {
  try {
    let adminData = req.body;
    let { firstName, lastName, phone, email, password } = adminData;

    //validations for first Name
    if (!firstName)
      return res
        .status(400)
        .send({ status: false, message: "First Name is required." });
    if (typeof firstName != "string")
      return res
        .status(400)
        .send({ status: false, message: "First Name should be a string." });
    if (firstName.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "First Name can't be empty." });
    if (!onlyLetters.test(firstName))
      return res.status(400).send({
        status: false,
        message: "First Name can only contain alphabets.",
      });

    //validations for last Name
    if (!lastName)
      return res
        .status(400)
        .send({ status: false, message: "Last Name is required." });
    if (typeof lastName != "string")
      return res
        .status(400)
        .send({ status: false, message: "Last Name should be a string." });
    if (lastName.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Last Name can't be empty." });
    if (!onlyLetters.test(lastName))
      return res.status(400).send({
        status: false,
        message: "Last Name can only contain alphabets.",
      });

    //validations for phone
    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "Phone is required." });
    if (typeof phone != "string")
      return res
        .status(400)
        .send({ status: false, message: "Phone should be a string." });
    if (phone.length != 10)
      return res
        .status(400)
        .send({ status: false, message: "Phone should be of length 10" });
    if (await adminModel.findOne({ phone: phone }))
      return res
        .status(400)
        .send({ status: false, message: "Phone already exists." });

    //validations for email
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email is required." });
    if (typeof email != "string")
      return res
        .status(400)
        .send({ status: false, message: "Email should be a string." });
    if (email.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Email can't be empty." });
    if (!validEmail.test(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email." });
    if (await adminModel.findOne({ email: email }))
      return res
        .status(400)
        .send({ status: false, message: "Email already exists." });

    //validations for password
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required." });
    if (typeof password != "string")
      return res
        .status(400)
        .send({ status: false, message: "Password should be a string." });
    if (password.length < 8 || password.length > 15)
      return res
        .status(400)
        .send({ status: false, message: "Password can be of length 8 to 15" });

    let savedAdmin = await adminModel.create(adminData);
    return res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};



//----------------------------------------Login----------------------------------------------------




let adminLogin = async (req, res) => {
  try {
    let adminData = req.body;
    let { email, password } = adminData;

    //validations for email
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email is required." });
    if (typeof email != "string")
      return res
        .status(400)
        .send({ status: false, message: "Email should be a string." });
    if (email.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Email can't be empty." });
    if (!validEmail.test(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email." });

    //validations for password
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required." });
    if (typeof password != "string")
      return res
        .status(400)
        .send({ status: false, message: "Password should be a string." });
    if (password.length < 8 || password.length > 15)
      return res
        .status(400)
        .send({ status: false, message: "Password can be of length 8 to 15" });

    let data = await adminModel.findOne({ email: email, password: password });
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "Invalid credentials" });

    let token = jwt.sign({ userId: data._id, isAdmin: true }, "questionAnswer");

    return res.status(200).json({ status: true, token: token });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};





module.exports = { adminRegister, adminLogin };


