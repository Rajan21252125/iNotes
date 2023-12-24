import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState({});
  const showAlert = (message, type) => {
    setAlert({
      msg:message,
      type:type,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
