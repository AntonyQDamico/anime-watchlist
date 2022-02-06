import "../App/App.css";
import "./Login.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(props.extraMessage || "");

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
      url: "/api/login",
      data: {
        email: username,
        password: password,
      },
      withCredentials: true,
      validateStatus: (status) => {
        return status < 400;
      },
    })
      .then((response) => {
        setUsername("");
        setPassword("");
        setLoginMessage(response.data);
        props.setIsAuth(true);
      })
      .catch((error) => {
        setPassword("");
        if (error.response.status === 401) {
          setLoginMessage("Email or Password is incorrect");
        } else {
          setLoginMessage(error.response.data);
        }
      });
  }
  return (
    <div className="content-area">
      {props.isAuth ? <Navigate to="/" /> : null}
      <section className="login-area">
        <h1>Login</h1>
        {loginMessage.length > 0 ? (
          <p className="pop-message">{loginMessage}</p>
        ) : null}
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
          <input type="submit" value="Login" />
        </form>
      </section>
      <section className="need-register">
        <p>
          Need to Sign Up? click <a href="./register">here to register</a>
        </p>
      </section>
    </div>
  );
}

export default Login;
