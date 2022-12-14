import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/register.css"

const AdminRegister = () => {
    let navigate = useNavigate()
    let [adminDetails, setAdminDetails] = useState({
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        password:""
    })
    function handleChange(event){
        let {name,value} = event.target
        setAdminDetails(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(adminDetails)
    }
    function handleClick(event){
        event.preventDefault()
        axios.post("/admin/register",adminDetails)
        .then(res=>{
            alert("Registered successfully")
            navigate("/admin/login")
        })
        .catch(err=>alert(err.response.data.message))
    }
  return (
    <form className='RegisterForm'>
        <h1>Signup</h1>
        <input type="text" name='firstName' placeholder='firstName' onChange={handleChange} value ={adminDetails.firstName}/>
        <input type="text" name='lastName' placeholder='lastName' onChange={handleChange} value ={adminDetails.lastName}/>
        <input type="text" name='phone' placeholder='phone' onChange={handleChange} value ={adminDetails.phone}/>
        <input type="email" name='email' placeholder='email' onChange={handleChange} value ={adminDetails.email}/>
        <input type="password" name='password' placeholder='password' onChange={handleChange} value ={adminDetails.password}/>
        <Link to= "/admin/login">Already Registered?</Link>
        <button onClick={handleClick}>Register</button>
    </form>
  )
}

export default AdminRegister