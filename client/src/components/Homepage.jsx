import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../assets/Question";
import QuestionForStudent from "../assets/QuestionForStudent";
import "../styles/homepage.css";

const Homepage = () => {
  let navigate = useNavigate();
  let [userLoggedIn, setUserLoggedIn] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    isAdmin: "",
  });

  useEffect(() => {
    axios
      .get("/user", {
        headers: { "x-api-key": localStorage.getItem("x-api-key") },
      })
      .then((res) => {
        setUserLoggedIn((prev) => ({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          password: res.data.password,
          isAdmin: res.data.isAdmin,
        }));
      });
  }, []);

  let [isclicked, setIsClicked] = useState(false);

  let [questions, setQuestions] = useState([]);

  function getQuestions(event) {
    event.preventDefault();
    setIsClicked(true);
    axios
      .get("/questions")
      .then((res) => {
        setQuestions([...res.data]);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  }

  let [question, setQuestion] = useState({
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    answer: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCreate(event) {
    axios
      .post("/questions", question, {
        headers: { "x-api-key": localStorage.getItem("x-api-key") },
      })
      .then((res) => {
        alert("Updated successfully");
        navigate("/homepage");
      })
      .catch((err) => alert(err.response.data.message));
  }
  return (
    <>
      {userLoggedIn.isAdmin ? (
        <div className="homepage">
          <h1>Hello {userLoggedIn.firstName}</h1>
          <h4>You can add or update the existing question here. </h4>
          {!isclicked && <button onClick={getQuestions}>get questions</button>}
          {isclicked && (
            <div className="questions">
              {questions.map((ele) => {
                return (
                  <Question
                    key={ele._id}
                    question={ele.question}
                    ans1={ele.ans1}
                    ans2={ele.ans2}
                    ans3={ele.ans3}
                    ans4={ele.ans4}
                    answer={ele.answer}
                    id={ele._id}
                  ></Question>
                );
              })}
              <h5>Add new question</h5>
              <input
                type="text"
                name="question"
                placeholder="Question"
                onChange={handleChange}
                value={question.question}
              />
              <input
                type="text"
                name="ans1"
                placeholder="Option 1"
                onChange={handleChange}
                value={question.ans1}
              />
              <input
                type="text"
                name="ans2"
                placeholder="Option 2"
                onChange={handleChange}
                value={question.ans2}
              />
              <input
                type="text"
                name="ans3"
                placeholder="Option 3"
                onChange={handleChange}
                value={question.ans3}
              />
              <input
                type="text"
                name="ans4"
                placeholder="Option 4"
                onChange={handleChange}
                value={question.ans4}
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                onChange={handleChange}
                value={question.answer}
              />
              <button onClick={handleCreate}>Add</button>
            </div>
          )}
        </div>
      ) : (
        <div className="homepage">
          <h1>Hello {userLoggedIn.firstName}</h1>
          {!isclicked && <p>Ready for your exam?</p>}
          {!isclicked && <button onClick={getQuestions}>get questions</button>}
          {isclicked && (
            <div className="questions">
              {questions.map((ele) => {
                return (
                  <QuestionForStudent
                    key={ele._id}
                    question={ele.question}
                    ans1={ele.ans1}
                    ans2={ele.ans2}
                    ans3={ele.ans3}
                    ans4={ele.ans4}
                    answer={ele.answer}
                  ></QuestionForStudent>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Homepage;
