import "./App.css";
import Navbar from "../Navbar/Navbar.js";
import Home from "../Home/Home.js";
import Account from "../Account/Account.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Watchlist from "../Watchlist/Watchlist.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  function authCheck() {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "api/auth-check",
      withCredentials: true,
    })
      .then((response) => setIsAuth(response.data))
      .catch((error) => setIsAuth(false));
  }
  useEffect(authCheck, []);
  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/account" exact element={<Account isAuth={isAuth} />} />
          <Route
            path="/login"
            exact
            element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/register"
            exact
            element={<Register isAuth={isAuth} />}
          />
          <Route
            path="/watchlist"
            exact
            element={<Watchlist isAuth={isAuth} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
