import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successfully" , "success");
      navigate("/");

    } else {
     
      props.showAlert("Invalid credentials" , "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
   
      <form onSubmit={handleSubmit}>
      <div className="register">
        <h1>Login</h1>
     
          <input
            type="email"
            placeholder='Your email' 
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
       
          <input
            type="password"
            className="form-control"
            placeholder='Your password'
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />

          

         <button type="submit" className="button" style={{height:"50px", width:"350px"}}>
         Login
          </button>
       
        <div>or</div>

        <div className="button" onClick={() => navigate("/Signup")}>
          Register
        </div>
      </div>
      </form>
    
  );
};

export default Login;



