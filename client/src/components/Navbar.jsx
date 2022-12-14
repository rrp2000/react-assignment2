import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    let navigate = useNavigate()
    function logout(event){
        localStorage.setItem("x-api-key","")
        navigate("/")
    }
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Exams.io</h1>
      </Link>
      <h6 onClick={logout} >Logout</h6>
    </div>
  );
};

export default Navbar;
