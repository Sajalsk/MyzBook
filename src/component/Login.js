import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  
  const style = {
    login: {
      width: "400px",
      background: "#fff",
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
  };
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/auth/login", {   // backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();    // Now json contains all the credentials
    console.log(json);

    if (json.success) {                    // valid credentials
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });  // {...} All the value (email&password)    make (name->value )
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register" style={style.login}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Your email"
          className="form-control"
          value={credentials.email}  
          onChange={onChange}
          id="email"
          name="email"
          aria-describedby="emailHelp"
          style={style.input}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Your password"
          value={credentials.password}
          onChange={onChange}
          name="password"
          id="password"
        />

        <button
          type="submit"
          className="button"
          style={{ height: "50px", width: "350px",...style.button }}
        >
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
