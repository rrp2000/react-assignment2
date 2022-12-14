import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/login.css"

const AdminLogin = () => {
    let navigate = useNavigate()
    let [adminDetails, setAdminDetails] = useState({
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
        axios.post("/admin/login",adminDetails)
        .then(res=>{
            alert("Login successful")
            localStorage.setItem("x-api-key",res.data.token)
            navigate("/homepage")
        })
        .catch(err=>alert(err.response.data.message))
    }
  return (
    <form className='LoginForm'>
        <h1>Login</h1>
        <input type="email" name='email' placeholder='email' onChange={handleChange} value ={adminDetails.email}/>
        <input type="password" name='password' placeholder='password' onChange={handleChange} value ={adminDetails.password}/>
        <Link to= "/admin/signup">Not Registered?</Link>
        <button onClick={handleClick}>Register</button>
    </form>
  )
}

export default AdminLogin