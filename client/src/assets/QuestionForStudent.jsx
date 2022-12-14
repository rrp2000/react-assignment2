import React, { useState } from 'react'
import "../styles/questionStudent.css"

const QuestionForStudent = (props) => {

    let [ans, setAnswer] = useState("submit")
    let [isClicked,setIsClicked] = useState(false)

    function handleChange(event){
        setIsClicked(!isClicked)
    }

    function submitAns(event){
        event.preventDefault()
        setAnswer("Ans: "+props.answer)
    }

  return (
    <div className='question'>
    <h4>{props.question}</h4>
    <span className='input'><input disabled= {isClicked} type="radio" onChange={handleChange} name = {props.question} value = {props.ans1} /><label>{props.ans1}</label><br/></span>
    <span className='input'><input disabled= {isClicked} type="radio" onChange={handleChange} name = {props.question} value = {props.ans2} /><label>{props.ans2}</label><br/></span>
    <span className='input'><input disabled= {isClicked} type="radio" onChange={handleChange} name = {props.question} value = {props.ans3} /><label>{props.ans3}</label><br/></span>
    <span className='input'><input disabled= {isClicked} type="radio" onChange={handleChange} name = {props.question} value = {props.ans4} /><label>{props.ans4}</label><br/></span>
    <button disabled = {!isClicked} onClick={submitAns}>{ans}</button>
  </div>
  )
}

export default QuestionForStudent