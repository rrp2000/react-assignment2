import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"

function StudentLogin(){
    let navigate = useNavigate()
    let [student, setStudent] = useState({
        email:"",
        password:""
    })

    function handleChange(event){
        let {name,value} = event.target

        setStudent(prev=>({
            ...prev,
            [name]:value
        }))
    }

    function handleClick(event){
        event.preventDefault()

        axios.post("/student/login",student)
        .then(res=>{
            console.log(res)
            localStorage.setItem("x-api-key",res.data.token)
            navigate("/homepage")
        })
        .catch(err=>console.log(err))

    }

    return <form className='LoginForm'>
    <h1>Login</h1>
    <input type="email" name='email' placeholder='email' onChange={handleChange} value ={student.email}/>
    <input type="password" name='password' placeholder='password' onChange={handleChange} value ={student.password}/>
    <Link to= "/admin/signup">Not Registered?</Link>
    <button onClick={handleClick}>Register</button>
</form>
}

export default StudentLogin