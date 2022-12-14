import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/questionAdmin.css"

const Question = (props) => {

    let params = useParams()
    

    let navigate = useNavigate()
    let [data,setData] = useState({
        id:params.id,
        question: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        answer: "",
      })

    useEffect(()=>{
        axios.get(`/question/${params.id}`,{headers: { "x-api-key": localStorage.getItem("x-api-key") }})
        .then(res=>{
            setData({
                id:params.id,
                question: res.data.question,
                ans1: res.data.ans1,
                ans2: res.data.ans2,
                ans3: res.data.ans3,
                ans4: res.data.ans4,
                answer: res.data.answer,
              })
        })
        .catch(err=>console.log(err))
    },[params.id])

    function handleChange(event){
        let {name, value} = event.target
        setData(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(data)
    }

    function handleUpdate(event){
        axios.put("/questions",{...data},{headers: { "x-api-key": localStorage.getItem("x-api-key") }})
        .then(res=>{
            alert("Updated successfully")
            navigate("/homepage")
        })
        .catch(err=>alert(err.response.data.message))
        
    }

    
  return ( 
  <div className='question'>
  <label>Update the question.</label><br/>
    <div className='questionInput'><label>Question</label><input type="text" name='question' placeholder='Question' onChange={handleChange} value ={data.question}/><br/></div>
    <div className='questionInput'><label>Option 1</label><input type="text" name='ans1' placeholder='Option 1' onChange={handleChange} value ={data.ans1}/><br/></div>
    <div className='questionInput'><label>Option 2</label><input type="text" name='ans2' placeholder='Option 2' onChange={handleChange} value ={data.ans2}/><br/></div>
    <div className='questionInput'><label>Option 3</label><input type="text" name='ans3' placeholder='Option 3' onChange={handleChange} value ={data.ans3}/><br/></div>
    <div className='questionInput'><label>Option 4</label><input type="text" name='ans4' placeholder='Option 4' onChange={handleChange} value ={data.ans4}/><br/></div>
    <div className='questionInput'><label>Answer</label><input type="text" name='answer' placeholder='Answer' onChange={handleChange} value ={data.answer}/><br/></div>
    <button onClick={handleUpdate}>Update</button>
    
  </div>
  )
}

export default Question
