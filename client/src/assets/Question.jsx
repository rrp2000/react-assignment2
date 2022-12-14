import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/questionAdmin.css"

const Question = (props) => {
    let navigate = useNavigate()
    let [data,setData] = useState({})
    useEffect(()=>{
        setData(props)
    },[props])

    let [isChanged, setIsChanged] = useState(false)

    function handleChange(event){
        setIsChanged(true)
        let {name, value} = event.target
        setData(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(data)
    }

    function handleUpdate(event){
        axios.put("/questions",{...data})
        .then(res=>{
            alert("Updated successfully")
            navigate("/homepage")
        })
        .catch(err=>alert(err.response.data.message))
        
    }

    
  return ( 
  <div className='question'>
  <label>=======================================</label><br/>
    <div className='questionInput'><input type="text" name='question' placeholder='Question' onChange={handleChange} value ={data.question}/><label>Question</label><br/></div>
    <div className='questionInput'><input type="text" name='ans1' placeholder='Option 1' onChange={handleChange} value ={data.ans1}/><label>Option 1</label><br/></div>
    <div className='questionInput'><input type="text" name='ans2' placeholder='Option 2' onChange={handleChange} value ={data.ans2}/><label>Option 2</label><br/></div>
    <div className='questionInput'><input type="text" name='ans3' placeholder='Option 3' onChange={handleChange} value ={data.ans3}/><label>Option 3</label><br/></div>
    <div className='questionInput'><input type="text" name='ans4' placeholder='Option 4' onChange={handleChange} value ={data.ans4}/><label>Option 4</label><br/></div>
    <div className='questionInput'><input type="text" name='answer' placeholder='Answer' onChange={handleChange} value ={data.answer}/><label>Answer</label><br/></div>
    {isChanged && <button onClick={handleUpdate}>Update</button>}
    
  </div>
  )
}

export default Question
