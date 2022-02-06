import "../Login/Login.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

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
      url: "/api/register",
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
        setRegisterMessage(response.data);
        setRedirect(true);
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
        setRegisterMessage(error.response.data);
      });
  }
  return (
    <div className="content-area">
      {props.isAuth ? <Navigate to="/" /> : null}
      {redirect ? (
        <Navigate
          to={{
            pathname: "/login",
            state: { extraMessage: registerMessage },
          }}
        />
      ) : null}
      <section className="login-area">
        <h1>Sign Up</h1>
        {registerMessage.length > 0 ? (
          <p className="pop-message">{registerMessage}</p>
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
