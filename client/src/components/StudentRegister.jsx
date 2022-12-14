import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css"

function StudentRegister(){
    let navigate = useNavigate()
    let [studentData, setStudentData] = useState({
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        password:""
    })

    function handleChange(event){
        let {name,value} = event.target
        setStudentData(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(studentData)
    }


    function handleClick(event){

        event.preventDefault()
        axios.post("/student/register",studentData)
        .then(res=>{
            console.log(res)
            alert("Registered successfully")
            navigate("/student/login")
        })
        .catch(err=>alert(err.response.data.message))

    }


    return <form className='RegisterForm'>
    <h1>Student Signup</h1>
    <input type="text" name='firstName' placeholder='firstName' onChange={handleChange} value ={studentData.firstName}/>
    <input type="text" name='lastName' placeholder='lastName' onChange={handleChange} value ={studentData.lastName}/>
    <input type="text" name='phone' placeholder='phone' onChange={handleChange} value ={studentData.phone}/>
    <input type="email" name='email' placeholder='email' onChange={handleChange} value ={studentData.email}/>
    <input type="password" name='password' placeholder='password' onChange={handleChange} value ={studentData.password}/>
    <Link to= "/student/login">Already Registered?</Link>
    <button onClick={handleClick}>Register</button>
</form>
}

export default StudentRegister