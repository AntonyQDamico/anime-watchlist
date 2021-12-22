import "../App/App.css";
import "./Login.css";
import { useState } from "react";

function Login() {
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
    console.log("Well, it worked! Login Edition");
    setUsername("");
    setPassword("");
  }
  return (
    <div className="content-area">
      <section className="login-area">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter Username"
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
