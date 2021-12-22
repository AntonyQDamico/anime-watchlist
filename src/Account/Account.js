import "../App/App.css";
import "./Account.css";
import { useState } from "react";

function Account() {
  const [password, setPassword] = useState("");

  function handlePassChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Well, it worked! Account Edition");
    setPassword("");
  }

  return (
    <div className="content-area">
      <section className="account-area">
        <h1>Account Info</h1>
        <h2>Hello TBD-User</h2>
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
