import "../Login/Login.css";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUserChange(event) {
    setUsername(event.target.value);
  }
  function handlePassChange(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_URL + "api/register",
      body: {
        email: username,
        password: password,
      },
      validateStatus: (status) => {
        return status < 400;
      },
    }).then(); //TODO: Finish This handler
    console.log("Well, it worked! Register Edition");
    setUsername("");
    setPassword("");
  }
  return (
    <div className="content-area">
      <section className="login-area">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <b>Email</b>
          </label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            name="username"
            value={username}
            onChange={handleUserChange}
            required
          />
          <br />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={handlePassChange}
            required
          />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </section>
      <section className="need-register">
        <p>
          Already have an account? click <a href="./login">here to login</a>
        </p>
      </section>
    </div>
  );
}

export default Register;
