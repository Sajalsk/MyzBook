import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

  const [credentials, setCredentials] = useState({ name : "" ,email: "", password: "" , reEnterpassword: ""  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}= credentials
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
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
   
    <form onSubmit={handleSubmit}>
    <div className="register">
     
        <h1>Register</h1>
        <input type="text" name="name" value={credentials.name} placeholder='Your Name' onChange={handlechange} />
        <input type="text" name="email" value={credentials.email} placeholder='Your email' onChange={handlechange} />
        <input type="text" name="password" value={credentials.password} placeholder='Your password' minLength={5} required onChange={handlechange} />
        <input type="text" name="reEnterpassword" value={credentials.reEnterpassword}placeholder='Re-enter password' minLength={5} required  onChange={handlechange} />
        <button type="submit" className="btn btn-primary">
            Register
          </button>
         
        

    </div>
    </form>
  
  )
}

export default Register;