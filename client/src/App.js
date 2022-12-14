import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Homepage from "./components/Homepage";
import Landing from "./components/Landing";
import StudentRegister from "./components/StudentRegister";
import StudentLogin from "./components/StudentLogin";



import "./app.css"
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />}/>
        <Route path="/admin/signup" element={<AdminRegister />} />
        <Route path="/homepage" element = {<Homepage />} />
        <Route path="/student/signup" element = {<StudentRegister />} />
        <Route path="/student/login" element = {<StudentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
