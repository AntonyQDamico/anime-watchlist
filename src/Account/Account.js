import "../App/App.css";
import "./Account.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Account(props) {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("Welcome Back");
  const [pwMessage, setPWMessage] = useState("");

  function handlePassChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "put",
      url: process.env.REACT_APP_SERVER_URL + "api/users",
      data: { password: password },
      withCredentials: true,
    })
      .then((response) => {
        setPWMessage("Password Successfully Updated");
        setPassword("");
      })
      .catch((error) => {
        setPWMessage("Could Not Update Password");
        setPassword("");
      });
  }
  function getUser() {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "api/users",
      withCredentials: true,
    })
      .then((response) => setUser(response.data))
      .catch((error) => setUser("Welcome Back"));
  }

  useEffect(getUser, []);
  return (
    <div className="content-area">
      {props.isAuth ? null : <Navigate to="/login" />}
      <section className="account-area">
        <h1>Account Info</h1>
        <h2>Hello {user}</h2>
        {pwMessage.length > 0 ? <p>{pwMessage}</p> : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Change Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter New Password"
            name="password"
            value={password}
            onChange={handlePassChange}
            required
          />
          <br />
          <input type="submit" value="Update Password" />
        </form>
      </section>
    </div>
  );
}

export default Account;
