import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/landing.css"

const Landing = () => {
    let navigate = useNavigate()
  return (<div className='landing'>
    <div id='heading'>Welcome to Exam.io</div>
    <div className='landingButtons'>
        <button id='admin' onClick={()=>{navigate("/admin/login")}}>Admin Login</button>
        <button id='student' onClick={()=>{navigate("/student/login")}}>Student Login</button>
    </div>
  </div>
  )
}

export default Landing