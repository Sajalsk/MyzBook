import { useState } from "react";
import "./App.css";
import NoteState from "./Context/Notestate";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Alert from "./component/Alert";
import Signup from "./component/register";
import Login from "./component/Login";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="About" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup"  element={<Signup showAlert={showAlert} />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

// For Frontend
// npm start

// for backend
// cd Backend
// nodemon index.js
