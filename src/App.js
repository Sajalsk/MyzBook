import "./App.css";
import NoteState from "./Context/Notestate";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
// import Notes from "./component/Notes";
import Alert from "./component/Alert";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is a React course"/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="About" element={<About/>} />
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
