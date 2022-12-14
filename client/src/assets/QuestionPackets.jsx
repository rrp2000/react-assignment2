import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/homepage.css"

const  QuestionPackets = (props) => {

    let navigate = useNavigate()

    function handleClick(event){
        navigate(`/homepage/update/${props.id}`)
    }
  return (
    <div className='questionPackets' onClick={handleClick}> {props.question} </div>
  )
}

export default QuestionPackets