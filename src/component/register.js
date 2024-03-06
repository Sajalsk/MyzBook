import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

  const style = {
    register: {
      width: "400px",
      background: "rgb(255, 255, 255)",
      border: "1px solid #dddfe2",
      boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
      borderRadius: "8px",
      padding: "1rem",
      alignItems: "center",
      textAlign: "center",
    },
    input: {
      borderRadius: "8px",
      border: "2px solid #dddfe2",
      outline: "none",
      color: "#1d2129",
      margin: "0.5rem 0",
      padding: "0.5rem 0.75rem",
      width: "92%",
      fontSize: "1rem",
    },
    button: {
      background: "#1877f2",
      border: "1px solid #1877f2",
      color: "#fff",
      fontSize: "1.25rem",
      padding: "0.5rem",
      margin: "0.5rem 0",
      borderRadius: "8px",
      outline: "none",
      cursor: "pointer",
    },
  }

  const [credentials, setCredentials] = useState({ 
    name : "" ,
    email: "", 
    password: "" , 
    reEnterpassword: ""  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    // to prevent refresh  w/o enteries
    const {name,email,password} = credentials
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials" , "danger");

    }
  };

  const handlechange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });  // spread operator
  };

  return (
   
    <form onSubmit={handleSubmit}>
    <div className="register" style={style.register}>
     
        <h1>Register</h1>
        <input type="text" name="name" value={credentials.name} placeholder='Your Name' onChange={handlechange} />
        <input type="text" name="email" value={credentials.email} placeholder='Your email' onChange={handlechange}    style={style.input} />
        <input type="text" name="password" value={credentials.password} placeholder='Your password' minLength={5} required onChange={handlechange} />
        <input type="text" name="reEnterpassword" value={credentials.reEnterpassword}placeholder='Re-enter password' minLength={5} required  onChange={handlechange}  style={style.input} />
        <button type="submit" className="btn btn-primary" style={style.input}>
            Register
          </button>
         
        

    </div>
    </form>
  
  )
}

export default Register;